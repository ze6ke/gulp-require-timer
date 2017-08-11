# Gulp Require Timer

I built my first non-trivial gulpfile following tutorials on the web and
examples from the different libraries I included.  Worse, gulp was claiming
super fast performance.  This library gave me visibility into the other
tasks being done in my gulpfile that were slowing gulp down.

## How to Use

This is a very simple library that won't clutter your output or slow down the
system significantly and is intended to be left installed even after the system
is going fast enough.  There are more robust gulp timers available, but they
are bigger tools than I've ever needed for my projects.

The first line in your gulpfile should be importing this library:

    const requiret = require('gulp-require-timer')

After that, you should never call require directly again and should
always call requiret.require like this.

    const gulp = requiret.require('gulp')

After all the requires that you want to report on have been executed, 
set requiret.notification to false.

    requiret.notifications = false

Even after notifications have been set to false, the library stores execution times,
which are available in requiret.times.

## Advice on Optimization

For the original draft of my first full gulpfile, most of the delay was require
statements outside of gulp tasks.  

Require caches each file, so these two blocks of code will have similar performance

    requiret.require('gulp')


    //calling it 3 times only executes it once, so there's no 
    //performance penalty to this.
    requiret.require('gulp')
    requiret.require('gulp')
    requiret.require('gulp')

That means that instead of a structure like this.

    const l1 = requiret.require('library1')
    const l2 = requiret.require('library2')
    const l3 = requiret.require('library3')

    gulp.task('task1', () => {
      l1.dosomething()
    })

    gulp.task('task2', () => {
      l2.dosomething()
    })

    gulp.task('task3', () => {
      l3.dosomething()
    })

It's much better to put the require statements inside of the tasks whenever possible.


    gulp.task('task1', () => {
      const l1 = requiret.require('library1')
      l1.dosomething()
    })

    gulp.task('task2', () => {
      const l2 = requiret.require('library2')
      l2.dosomething()
    })

    gulp.task('task3', () => {
      const l3 = requiret.require('library3')
      l3.dosomething()
    })

Because require optimizes multiple calls, there's no need to try to prevent 
require from being called repeatedly for one library.  This structure means 
that you don't have to wait for libraries 2 and 3 to load in order to use 
library 1.  As an added benefit, if you do end need to execute all three tasks,
this structure allows gulp to run things in parallel, which isn't possible for
blocks of require statements at the top of your gulpfile.

Putting numbers on it, if each require statement takes 1 second, and each 
dosomething statement takes 2 seconds, this structure change would take task 1
from 5 seconds (3 * 1 second for the require statements and 2 seconds for the 
dosomething statement) to 3 seconds (1 second for a single require statement and
2 seconds for the dosomething statement).

## Repository

The repository for this project is available at [https://github.com/ze6ke/gulp-require-timer](https://github.com/ze6ke/gulp-require-timer).

## License

This library is available under the MIT license.
