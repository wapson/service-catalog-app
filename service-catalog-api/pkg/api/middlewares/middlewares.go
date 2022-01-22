package middlewares

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/schemas"
)

func SetAuthMiddlewares (e *echo.Echo) {
	e.Use(middleware.JWTWithConfig(middleware.JWTConfig{
  	SigningKey: []byte("secret"),
  	Claims: &schemas.JwtCustomClaims{},
	}))
}
func SetMainMiddlewares(e *echo.Echo) {
	
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
		AllowOrigins:     []string{"*"},
		AllowHeaders:     []string{"*"},
	}))
}
