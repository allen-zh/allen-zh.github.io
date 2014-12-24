fis.config.set('roadmap.domain', '/demo/smc-1.0.5');

fis.config.merge({
    modules: {
        parser: {
            less: 'less'
        },
        optimizer: {
            html: 'html-compress'
        }
    },
    pack: {
        'css/aio.css': [
            'css/**.css',
            'css/**.less'
        ],
        'js/aio.js': [
            'js/**.js'
        ]
    },
    roadmap: {
        ext: {
            less: 'css'
        },
        path: [{
            reg: '**.otf',
            release: '$&',
            useHash: true,
            useDomain: true
        }]
    },
    deploy: {
        smc: {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的上一级的output目录中
            to: '../smc-1.0.5'
        }
    }
});
