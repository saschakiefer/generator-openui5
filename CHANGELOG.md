<a name="v0.2.1"></a>
### v0.2.1 (2015-01-29)


#### Bug Fixes

* **app:**
  * spelling changes in readme ([51157049](http://github.com/saschakiefer/generator-openui5/commit/511570491d7ce9092a58bab4debc6afa7094b2c0))
  * fix error in component namespace for openui5-sample template ([1d37c3f1](http://github.com/saschakiefer/generator-openui5/commit/1d37c3f12908de055f18d90c7e3ee88742d54605))
  * Change OpenUI5 Version to 1.22.9 ([5ad20928](http://github.com/saschakiefer/generator-openui5/commit/5ad209284da768f37b7155e3dfd5cab06617a729))
  * Change OpenUI5 Version to 1.20.10 ([371dee8c](http://github.com/saschakiefer/generator-openui5/commit/371dee8c18748a1e1aec4fff29d5c7f813025ad2))
  * Fixed the tap event for sap.m.SplitApp based apps ([2e36e42b](http://github.com/saschakiefer/generator-openui5/commit/2e36e42be83bff0bfd002c56e0e4115e8c57354b), closes [#70](http://github.com/saschakiefer/generator-openui5/issues/70))
  * remove trailing whitespace from generated Gruntfile.js ([5ea9ae17](http://github.com/saschakiefer/generator-openui5/commit/5ea9ae179d8757d4b7643d1edead25cc6e76c5f6), closes [#68](http://github.com/saschakiefer/generator-openui5/issues/68))
  * Fix typo ([f68cd754](http://github.com/saschakiefer/generator-openui5/commit/f68cd7549e338354d8f0279bb66eaef64633b1dd))
* **gen:**
  * fix args and options handling from prev commit. ([f83a9177](http://github.com/saschakiefer/generator-openui5/commit/f83a91774c0fbf11bd606cd29f677e6f7acd0256))
  * Fix skip-install logic - argument handling now works. Allows us to manually run  ([3e2c8c8c](http://github.com/saschakiefer/generator-openui5/commit/3e2c8c8ca2f17c580b832aa81b526b4f04bd24c7))


#### Features

* **app:**
  * add .Ui5RepositoryIgnore file to ignore all the npm modules when app is deployed ([05e055f7](http://github.com/saschakiefer/generator-openui5/commit/05e055f7f24f2b18ba2c6d54191f4ae6117674ec))
  * TDG app - remove sap's dodgy qunit test ([b475d89b](http://github.com/saschakiefer/generator-openui5/commit/b475d89b253606be8480483d04a2c9d783bf125e))
* **gen:**
  * Add new application template for openui5-sample ([33f20faf](http://github.com/saschakiefer/generator-openui5/commit/33f20fafda15a5945b40112bc5e787aaa9febd2d))
  * Add new sub-genreator for scaffolding out build files only ([c125f7be](http://github.com/saschakiefer/generator-openui5/commit/c125f7be77ac8b5012f0b622462e9fb5f3c4ae0c))
  * new sub-generator for scafolding-out build tools only ([96d03004](http://github.com/saschakiefer/generator-openui5/commit/96d03004651561df4e7bb90644f24d825726d516))
  * new app template - SAP TDG best practices app ([4617be0c](http://github.com/saschakiefer/generator-openui5/commit/4617be0c0ed3bae7286b30de1389e6b803685074))

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

