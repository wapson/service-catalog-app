package main

import (
	"fmt"
	"os"

	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/router"
)

// @title Service catalog API
// @version 0.1
// @description service catalog api.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host https://github.com/wapson/service-catalog-app/service-catalog-api
// @BasePath /v2

func main() {

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
		fmt.Println("$PORT must be set")
	}

	e := router.New()
	e.Start(":" + port)

}
