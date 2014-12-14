fis.config.set('roadmap.domain', '/demo/smc-1.0.0');

fis.config.merge({
    modules : {
        parser : {
            less : 'less'
        },
        optimizer : {
            html : 'html-compress'
        }
    },
    roadmap : {
        ext : {
            less : 'css'
        }
    }
});