package router

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/api/handlers"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/api/middlewares"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/schemas"
)

func New() *echo.Echo {

	e := echo.New()
	//Service
	e.GET("/listServices", handlers.ListServices)
	e.GET("/getService", handlers.GetService)
	// User
	e.POST("/addUser", handlers.AddUser)
	e.POST("/loginUser", handlers.LoginUser)

	r := e.Group("")

	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		Claims:     &schemas.JwtCustomClaims{},
		SigningKey: []byte("secret"),
	}
	r.Use(middleware.JWTWithConfig(config))

	//Service
	r.POST("/addService", handlers.AddService)
	r.DELETE("/deleteService", handlers.DeleteService)
	r.POST("/updateService", handlers.UpdateService)

	// User
	r.GET("/listUsers", handlers.ListUsers)
	r.GET("/updateUser", handlers.UpdateUser)

	//Setting routes
	middlewares.SetMainMiddlewares(e)

	return e
}
