var through = require('through2');

exports.defModule = function(params)
{
	let modules = params.modules;
	
	function find_module_name(file_path)
	{
		for (let i=0; i<modules.length; i++)
		{
			let module_name = modules[i];
			if (file_path.indexOf(module_name) != -1)
			{
				return module_name;
			}
		}
		return null;
	}
	
	function content(file, enc, cb)
	{
		if (file.isNull())
		{
			return cb();
		}
		
		let content = file.contents.toString(enc);
		let file_path = file.path;
		
		let module_name = find_module_name(file_path);
		if (module_name)
		{
			let new_content = "Runtime.rtl.defModule(function(require){\n" +
				"var exports = {};\n" +
				content + 
				"\nreturn {" +
				"'module_name': " + JSON.stringify(module_name) + "," +
				"'exports': exports" +
				"};\n" +
			"});\n";
			
			file.contents = Buffer.from(new_content, enc);
		}
		
		cb(null, file);
	}
	
	function end(cb)
	{
		cb();
	}
	
	return through.obj(content, end);
}