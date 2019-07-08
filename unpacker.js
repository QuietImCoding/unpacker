//////////////////////////////////////////
//  Un pack the code from the /packer/  //
//  By matthew@matthewfl.com            //
//  http://matthewfl.com/unPacker.html  //
//////////////////////////////////////////
// version 1.2


function unPack (code) {
    function indent (code) {
	try {
	    var tabs = 0, old=-1, add='';
	    for(var i=0;i<code.length;i++) {
		if(code[i].indexOf("{") != -1) tabs++;
		if(code[i].indexOf("}") != -1) tabs--;
		
		if(old != tabs) {
		    old = tabs;
		    add = "";
		    while (old > 0) {
			add += "\t";
			old--;
		    }
		    old = tabs;
		}
		
		code[i] = add + code[i];
	    }
	} finally {
	    tabs = null;
	    old = null;
	    add = null;
	}
	return code;
    }
    
    var env = {
        eval: function (c) {
            code = c;
        },
        window: {},
        document: {}
    };
    
    eval("with(env) {" + code + "}");
    
    code = (code+"").replace(/;/g, ";\n").replace(/{/g, "\n{\n").replace(/}/g, "\n}\n").replace(/\n;\n/g, ";\n").replace(/\n\n/g, "\n");
    
    code = code.split("\n");
    code = indent(code);
    
    code = code.join("\n");
    return code;
}

var fs = require('fs'),
    path = require('path'),    
    filePath = process.argv[2].replace(/\n$/, ''); //path.join(__dirname, process.argv[2].replace(/\n$/, ''));

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log(unPack(data));
	process.exit();
    } else {
        console.log(err);
    }
});




