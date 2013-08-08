// Gruntfile.js

module.exports = function(grunt) {
	
	grunt.initConfig({

		watch: {
			sass: {
				files: 'public/css/**/*.scss',
				tasks: ['sass'],
				options: {}
			},

			coffee: {
				files: 'public/**/*.coffee',
				tasks: ['coffee'],
				options: {}
			}
		},

		sass: {
			dist: {
				// options: {
				// 	style: 'expanded'
				// },

				files: {
					'public/css/main.css': 'public/css/main.scss'
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
			      src: ["public/**/*.coffee"],
			      dest: ".temp/js",
			      ext: ".js"
		    	}
		    ]
		  }
		},

		express: {
			options: {
      // Override defaults here
	      background: false
	    },
	    dev: {
        options: {
          script: 'server.js'
        }
      },
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-express-server');

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