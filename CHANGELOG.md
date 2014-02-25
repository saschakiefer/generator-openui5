<a name="v0.2.1"></a>
## v0.2.1 (2014-02-25)


#### Bug Fixes

* **application:** clean up quint task in the generated Gruntfile.js ([f4fe76e0](http://github.com/saschakiefer/generator-openui5/commit/f4fe76e0d18b7462fe26a1cef2d6d405411fda97))
* **gen:**
    * reintroduce the possibility to choose between XML and JS view for the classical  ([1ed5ca05](http://github.com/saschakiefer/generator-openui5/commit/1ed5ca05dd567dc05f04fbe971656d5aa9b977be))
    * Fixed basic details prompts ([8893b774](http://github.com/saschakiefer/generator-openui5/commit/8893b7742e3888ca7d99aff8504274ad2742379b))
    * Fix jsformat error and add back .gitignore for generated apps ([286e89f4](http://github.com/saschakiefer/generator-openui5/commit/286e89f40e29a707cb227796567badf0b81eb0f1))
* **rewrite:**
    * Handle formatting of json comments when adding new resource roots ([16626291](http://github.com/saschakiefer/generator-openui5/commit/16626291c5b1638406aaf2d6ecc6ee82b9334538), closes [#55](http://github.com/saschakiefer/generator-openui5/issues/55))
    * improve error message when needle not found error. ([9a06acce](http://github.com/saschakiefer/generator-openui5/commit/9a06acce39d7469feeac0b2807e80ce09e09f3aa))
    * Handle needle not found error in rewrite function. ([f15f72f8](http://github.com/saschakiefer/generator-openui5/commit/f15f72f84784b7f5a6847d05ccb23c1cb9354058), closes [#54](http://github.com/saschakiefer/generator-openui5/issues/54))
* **tests:** fixed generator tests failing since UI5 library options were added ([27b397e4](http://github.com/saschakiefer/generator-openui5/commit/27b397e40210a9144c337c3c790cdcd9153ffe5a))


#### Features


* **components:** Handle component namespaces ([bcf400f6](http://github.com/saschakiefer/generator-openui5/commit/bcf400f6e115ec0c00d7ce54c4a8575a29a29eef))
* **app:** 
    * Add Tiles app generation. ([d7720f4c](http://github.com/saschakiefer/generator-openui5/commit/d7720f4c405a059af0d20bd705ca4f90fac43bef))
    * Added single page mvc app. ([527f78ba](http://github.com/saschakiefer/generator-openui5/commit/527f78ba62bb9c63f61d952c79bbbb00ae206486))
* **build:**
    * add local http server ([3172bd9b](http://github.com/saschakiefer/generator-openui5/commit/3172bd9b02e3a0afc14b9883e6d0266197df0e2d))
    * added prompt to enable livereload ([5beba825](http://github.com/saschakiefer/generator-openui5/commit/5beba825589a9a7b5df219e08c3de4eb4f996378))
    * enable livereload of xml views ([27fa19e3](http://github.com/saschakiefer/generator-openui5/commit/27fa19e3258416dc3e1ec55e1f232e66b30249c1))
* **gen:**
    * update openui5-bower version to 1.18.8 ([aee6ff45](http://github.com/saschakiefer/generator-openui5/commit/aee6ff4546a08db54ff158a646cd03e38b88c0dc))
    * add possibility to chose where OpenUI5 is loaded from (local copy installed by bower or already existing location)([42751af5](http://github.com/saschakiefer/generator-openui5/commit/742751af5d765a31bc42d800ba08ed8f962ac465))
    * html page to demo web proxy capabilities. ([2f109961](http://github.com/saschakiefer/generator-openui5/commit/2f109961ec84a400481d359155cdeaa08509210a))


<a name="v0.2.0"></a>
## v0.2.0 (2014-01-07)


#### Bug Fixes

* **grunt:**
  * add utils to watch task ([46630b55](http://github.com/saschakiefer/generator-openui5/commit/46630b55edca83602c9efe599203304b3313a21b))
  * add generator specific utils files located in the root directory to grunt tests ([49bf60be](http://github.com/saschakiefer/generator-openui5/commit/49bf60bec4e9b5335611cee1e89c658bc13a232b))
  * fix wrong src variable name for tests in watch task ([8832ae8f](http://github.com/saschakiefer/generator-openui5/commit/8832ae8f25c8bea8ce89929f0c94aa3919e34ff9))
  * add doublequote check to grunt configuration ([7a128834](http://github.com/saschakiefer/generator-openui5/commit/7a12883410aa019051e7e12f4ba87e475eb813ee))
* **test:** remove empty test file ([7d9d2718](http://github.com/saschakiefer/generator-openui5/commit/7d9d271804095ca6787036b378101869e1e6e160))
* **view:**
  * add view/ prefix also before view names passed as parameter to the generator ([15985543](http://github.com/saschakiefer/generator-openui5/commit/1598554391f2eaed8944d55508be2a08e2a79341))
  * remove view. prefix from the default name. ([d1a83038](http://github.com/saschakiefer/generator-openui5/commit/d1a83038b52c048bada8afc03da68ead46236a8a))

#### Features

* **app:** 
  * add Fiori Master / Detail template
* **view:**
  * add XML View template

<a name="v0.1.4"></a>
### v0.1.4 (2013-12-22)

