package main

import (
	"os"
	"log"
	"time"
	"strings"
	"path/filepath"
	"html/template"
	"github.com/gin-gonic/gin"
)

var PROJECT_DIR = os.Getenv("PROJECT_DIR")
var GIN_MODE    = os.Getenv("GIN_MODE") 
// var ENVIRONMENT = os.Getenv("ENVIRONMENT")

var TEMPLATEDIR = PROJECT_DIR + "/templates/"
var STATIC_DIR  = PROJECT_DIR + "/static/"

var templates map[string] *template.Template
var funcMap = template.FuncMap {
	"year": year,
}

func main() {
	log.Println("Starting application...")

	if err := initializeTemplateMap(); err != nil {
		log.Fatalln(err)
	}

	router := setupRouter()
	router.Run()
}

func initializeTemplateMap() error {
	templates = map[string] *template.Template {}

	common := []string{ 
		TEMPLATEDIR + "common/header.tmpl",
		TEMPLATEDIR + "common/footer.tmpl",
		TEMPLATEDIR + "common/base.tmpl",
	}

	return filepath.Walk(TEMPLATEDIR, func(path string, info os.FileInfo, err error) error {
		basename := strings.Replace(path, TEMPLATEDIR, "", 1)

		if !info.IsDir() && basename != "" && basename[:6] != "common" {
			templates[basename] = template.Must(
				template.New("").Funcs(funcMap).ParseFiles(append([]string{ path }, common...)...),
			)

			if err != nil {
				return err
			}
		}

		return nil
	})
}

func setupRouter() *gin.Engine {
	router := gin.Default()
	router.SetTrustedProxies(nil)
	router.SetFuncMap(template.FuncMap {
		"year": year,
	})

	router.Static("/static", STATIC_DIR)
	router.StaticFile("/favicon.ico", STATIC_DIR + "favicon.ico")
	router.LoadHTMLGlob(TEMPLATEDIR + "**/*.tmpl")

	router.GET("/", home)
	router.GET("/ping", ping)
	router.GET("/login", login)
	router.GET("/profile", profile)
	router.GET("/register", register)
	router.GET("/user/:name", profile)

	router.POST("/login", login)
	router.POST("/register", register)

	return router
}

func year() int {
	return time.Now().Year()
}

func ping(ctx *gin.Context) {
	ctx.JSON(200, gin.H { "message": "pong" })
}

func login(ctx *gin.Context) {
	context := gin.H {
		"title": "Login",
	}

	if ctx.Request.Method == "POST" {
		username, success := ctx.GetPostForm("username")

		log.Println("POST", username, success)

		if success {
			context["username"] = username
			context["error"] = "Invalid username or password"
		}
	}

	render(ctx, "login/index.tmpl", context)
}

func profile(ctx *gin.Context) {
	render(ctx, "profile/index.tmpl", gin.H {
		"title": "Profile",
	})
}

func register(ctx *gin.Context) {
	context := gin.H {
		"title": "Register",
	}

	if ctx.Request.Method == "POST" {
		username, success := ctx.GetPostForm("username")

		if success {
			context["username"] = username
			context["error"] = "Invalid username or password"
		}
	}

	render(ctx, "register/index.tmpl", context)
}

func home(ctx *gin.Context) {
	render(ctx, "home/index.tmpl", gin.H {
		"title": "Home",
	})
}

func render(ctx *gin.Context, tmpl string, context map[string] interface{}) {
	if GIN_MODE != "release" {
		initializeTemplateMap()
	}

	err := templates[tmpl].ExecuteTemplate(ctx.Writer, tmpl, context)

	if err != nil {
		ctx.JSON(500, gin.H { "error": err })
	}
}