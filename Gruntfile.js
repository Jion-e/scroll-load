/*
 * Created with Sublime Text 2.
 * User: 田想兵
 * Date: 2015-03-26
 * Time: 14:11:42
 * Contact: 55342775@qq.com
 */

var fs = require("fs");
var path = require("path");
module.exports = function(grunt) {
	var today = new Date();
	var config = {
		version: [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getTime()].join('.'),
		pkg: grunt.file.readJSON('package.json')
	};
	config.publishVersion = config.pkg.version;
	config.uglify = {
		options: {
			banner: '/*! <%= pkg.name %> <%=pkg.family%> <%=pkg.author.url%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: ['src/<%= pkg.name %>.js', '!*.min.css'],
			dest: 'dist/<%= pkg.name %>.min.js'
		}
	};
	config.cssmin = {
		options: {
			compatibility: 'ie8', //设置兼容模式 
			noAdvanced: true //取消高级特性 
		},
		target: {
			files: [{
				expand: true,
				cwd: 'src',
				src: ['*.css', '!*.min.css'],
				dest: 'dist',
				ext: '.min.css'
			}]
		}
	};
	config.copy = {
		main: {
			expand: true,
			cwd: 'src/',
			src: ['*.js', '*.css'],
			dest: 'dist/',
			flatten: true,
			filter: 'isFile',
		},
	};
	config.concat = {
		options: {
			stripBanners: true,
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%=pkg.family%> - <%=pkg.author.url%> ' +
				'<%= grunt.template.today("yyyy-mm-dd") %> */\n',
		},
		dist: {
			src: ['src/scroll-load.js', 'src/scroll-load-jquery.js'],
			dest: 'dist/scroll-load-jquery.js',
		},
	};
	config.uglify.uplifyJquery = {
		src: ['dist/scroll-load-jquery.js'],
		dest: 'dist/scroll-load-jquery.min.js'
	};
	config.watch={
		scripts:{
			files:['src/**.*'],
			tasks:['default'],
			options:{
				livereload: true
			}
		},
		html:{
			files:['example/**.*'],
			tasks:['default'],
			options:{
				livereload: true
			}
		}
	};
	grunt.initConfig(config);
	// 加载包含 "uglify" 任务的插件。
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	// 默认被执行的任务列表。
	grunt.registerTask('default', ['uglify', 'cssmin', 'copy', 'concat', 'uglify:uplifyJquery']);
};