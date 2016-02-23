/**
 * A manifest for loading files depending on environment.
 */
(function(){
	
	/**
	 * In actual development, the environment could be set as an environmental variable so that this variable wouldn't need to be toggled manually.
	 */
	var developmentEnvironment = true;
	
	/**
	 * The assets are built by grunt from the bower packages, which should be updated automatically by npm install.
	 * @type {Array}
	 */
	var assets = [
		'assets/javascript/angular.min.js',
		'assets/javascript/angular-route.min.js',
		'assets/javascript/angular-messages.min.js'
	];

	/**
	 * In actual development, the manifest could be pulled in from a JSON file and/or compiled by grunt whenever a file changes or is added or removed.
	 */
	var manifest = {
		root: 'app/',
		ordered: ['app', 'routes'],
		components: ['dashboard', 'login']
	};

	//Select assets based on environment. A dev environment will load files individually for debugging purposes, otherwise it will load minified files.
	if (developmentEnvironment){
		manifest.ordered.forEach(function(file){
			assets.push(manifest.root + file + '.js');
		});
		manifest.components.forEach(function(file){
			assets.push(manifest.root + 'components/' + file + '/' + file + 'Controller.js');
		});
	} else {
		assets.push('assets/javascript/telemetry.min.js');
	}

	//Load assets onto page.
	assets.forEach(function(file){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = file;
		script.async = false;
		document.body.appendChild(script);
	});
})();