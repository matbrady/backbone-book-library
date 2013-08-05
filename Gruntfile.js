// Gruntfile.js

module.exports = function(grunt) {
	
	grunt.initConfig({

		watch: {
			sass: {
				files: '**/*.scss',
				tasks: ['sass'],
				options: {}
			},

			coffee: {
				files: '**/*.coffee',
				tasks: ['coffee'],
				options: {}
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded'
				},

				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		},

		// Compiles coffee files one-to-one 
		coffee: {
		  compile: {
		  	options: {
		  		bare: true
		  	},
		    files: [ 
		    	{
			      expand: true,
			      cwd: "coffee",
			      src: ["**/*.coffee"],
			      dest: ".temp/js",
			      ext: ".js"
		    	}
		    ]
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-coffee');

	grunt.registerTask('default', function() {
		var lines = [
			'You need to be more specific than that...',
			'Try one of these:',
			'grunt sass',
			'grunt coffee',
			'grunt watch',
			'grunt watch:sass',
			'grunt watch:coffee'
		];

		for (var i = 0; i < lines.length; i++) {
			grunt.log.writeln(lines[i]);
		};

	});

};