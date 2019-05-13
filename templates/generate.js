const path = require('path')
const CodeGenerateConfig = require('./config').default;
const Models = CodeGenerateConfig.models;

module.exports = function generate(gulp, nunjucksRender, rename, nunjucksRenderConfig) {
    for (let model of Models) {
        nunjucksRenderConfig.data = {
            model: CodeGenerateConfig.model,
            config: CodeGenerateConfig.config
        }
        const ServerProjectRootPath = nunjucksRenderConfig.ServerFullPath;
        const FrontendFullPath = nunjucksRenderConfig.FrontendFullPath;
        if (FrontendFullPath == "") {
            console.log("代码生成失败，请在 package.json 字段 FrontendFullPath 配置 d2-admin-pm(https://github.com/wjkang/d2-admin-pm) 项目绝对路径")
            break
        }
        //server
        const serverTemplatePath = 'templates/server/'
        gulp.src(`${serverTemplatePath}controller.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '.js'))
            .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ControllerRelativePath));

        gulp.src(`${serverTemplatePath}service.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + 'Service.js'))
            .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ServiceRelativePath));

        gulp.src(`${serverTemplatePath}model.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + 'Model.js'))
            .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.ModelRelativePath));

        gulp.src(`${serverTemplatePath}db.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '_db.json'))
            .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.DBRelativePath));

        gulp.src(`${serverTemplatePath}route.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + 'Route.js'))
            .pipe(gulp.dest(ServerProjectRootPath + CodeGenerateConfig.config.RouteRelativePath));

        //front-end
        const pageTemplatePath = 'templates/front-end/'
        gulp.src(`${pageTemplatePath}api.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '.js'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.APIRelativePath, Model.module)));

        gulp.src(`${pageTemplatePath}editForm.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename('editForm.vue'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.PagesRelativePath, Model.module, Model.name)));

        gulp.src(`${pageTemplatePath}index.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename('index.vue'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.PagesRelativePath, Model.module, Model.name)));
        gulp.src(`${pageTemplatePath}routerMapComponent.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '.js'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.RouterMapComponentRelativePath)));

        gulp.src(`${pageTemplatePath}menu.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '.js'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.MenuRelativePath)));

        gulp.src(`${pageTemplatePath}router.njk`)
            .pipe(nunjucksRender(nunjucksRenderConfig))
            .pipe(rename(Model.name + '.js'))
            .pipe(gulp.dest(path.join(FrontendFullPath, CodeGenerateConfig.config.RouterRelativePath)));
    }
}