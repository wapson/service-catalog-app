package api

import (
	"github.com/labstack/echo/v4"
	echoSwagger "github.com/swaggo/echo-swagger"
	_ "github.com/wapson/service-catalog-app/service-catalog-api/cmd/docs"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/api/handlers"
)

func MainGroup(e *echo.Echo) {

	// Register routes

	//Service

	e.POST("/addService", handlers.AddService)
	e.DELETE("/deleteService", handlers.DeleteService)
	e.POST("/updateService", handlers.UpdateService)

	e.GET("/listServices", handlers.ListServices)
	e.GET("/getService", handlers.GetService)
	// User
	e.POST("/addUser", handlers.AddUser)
	e.POST("/loginUser", handlers.LoginUser)
	e.GET("/listUsers", handlers.ListUsers)
	e.GET("/updateUser", handlers.UpdateUser)

	e.GET("/swagger/*", echoSwagger.WrapHandler)
}
