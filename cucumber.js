const { format } = require("node:path");

module.exports={

    default:{
        parallel :3,
        require: ['./features/stepDefinitions/steps.js', './features/support/hooks.js'],
        format :['progress', 'html:cucumber-report.html'],
         publishQuiet: true
    }

}