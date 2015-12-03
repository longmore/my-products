var fs = require('fs');
var path = require('path');
var http = require('http');
var mime = require('mime');

var port = '8888';

function rmdirP(path) {
    var paths = path.split('/');
    for (var i = paths.length; i >= 1; i--) {
        var p = paths.slice(0, i).join('/');
        if (fs.existsSync(path)) {
            if (fs.statSync(p).isDirectory()) {
                var fileList = fs.readdirSync(p);
                fileList.forEach(function (files) {
                    var curPatch = p + '/' + files;
                    if (fs.statSync(curPatch).isDirectory()) {
                        rmdirP(curPatch)
                    } else {
                        fs.unlinkSync(curPatch);
                    }
                });
                fs.rmdirSync(path);
            } else {
                fs.unlinkSync(path);
            }
        }
    }
}



function formatPras(str) {
    var query = {
        opt: '',
        target: ''
    };
    var prasArr = str.split('&');
    prasArr.forEach(function (peer) {
        var pra = peer.split('=');
        query[pra[0]] = pra[1];
    });
    return query;
}

var server = http.createServer(function (req, res) {

    var root = path.resolve();

    if (req.url == '/favicon.ico') {
        res.end();
        return false;
    }

    var reqPath = path.normalize(req.url);
    if (reqPath.indexOf('?') > -1) {
        var subRoot = reqPath;
        reqPath = reqPath.split('?')[0];
    }
    if (reqPath === '/ajax') {
        var pragmas = subRoot.split('?')[1];
        var querys = formatPras(pragmas);
        if (querys.opt === 'del') {
            var target = path.join(root, querys.target);
            console.log(target)
            fs.exists(target, function (exist) {
                if (exist) {
                    rmdirP(target);
                    res.end('del');
                    return false;
                } else {
                    res.end('no');
                    return false;
                }
            });
        }
    } else {
        var pathname = path.join(root, reqPath);
        fs.exists(pathname , function (exist) {
            if (exist) {
                if (fs.statSync(pathname).isDirectory()) {

                    var htmlStr = '<meta http-equiv="pragma" content="no-cache" />'
                        + '<meta http-equiv="Cache-Control" content="no-cache, must-revalidate,max-age=0" />'
                        + '<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT" />'
                        + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
                        + '<title>文件管理系统</title>';
                    htmlStr += '<link rel="stylesheet" href="/css/style.css"/>';
                    htmlStr += '<script src="./js/jquery.js" type="text/javascript"></script>';
                    htmlStr += '<script src="./js/app.js" type="text/javascript"></script>';
                    htmlStr += '<h1>文件管理系统<div class="btn back">后退</div><div class="btn pre">前进</div><div class="btn refresh">刷新</div></h1><ul>';

                    fs.readdir(pathname, function (err, files) {
                        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
                        if (err) {
                            console.error(err);
                        } else {
                            files.forEach(function (file) {
                                // if(pathname != root) {
                                //     pathname = pathname.replace(root, "");
                                // }
                                var eachFileName = path.join(pathname, file).replace(/\\/g, "/");
                                filePath = eachFileName.replace(root, '');
                                if (fs.statSync(eachFileName).isDirectory()) {
                                    htmlStr += '<li class="gray"><a href="' + filePath + '" class="title">' + file + ' </a><a href="javascript:void(0);" class="del-btn">删除</a></li>';
                                } else {
                                    htmlStr += '<li ><a href="' + filePath + '" class="title">' + file + '</a><a href="javascript:void(0);" class="del-btn">删除</a></li>';
                                }
                            });
                        }
                        htmlStr += '</ul><p>提示：以上目录列表，蓝色是文件夹，可点击继续进入下一节。</p>';

                        res.write(htmlStr);
                        res.end();
                        return;
                    });

                } else if (fs.statSync(pathname).isFile()) {
                    var fileName = path.basename(pathname);
                    var fileType = mime.lookup(fileName);
                    res.writeHead(200, {"Content-Type": fileType + ";charset=utf-8"})
                    fs.readFile(pathname, {flag: 'r'}, function (err, data) {
                        if (err) {
                            res.end(err);
                            return;
                        } else {
                            res.end(data);
                            return;
                        }
                    });
                }
            } else {
                res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
                res.write('<p><b style="color: red">' + pathname + '</b>，不存在。</p>');
                res.end();
                return;
            }
        });
    }
}).listen(port, function () {
    console.log('服务器启动成功，端口为：' + port);
});
