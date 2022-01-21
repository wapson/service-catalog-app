package utils

import (
	"errors"
	"fmt"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
)

func GetAuth(c echo.Context) (string, error) {

	header := c.Request().Header

	authHeader := header.Get("Authorization")

	authClaim := ""

	// Get bearer token
	if !strings.HasPrefix(strings.ToLower(authHeader), "bearer") {
		return "", errors.New("error: token not found")
	}

	values := strings.Split(authHeader, " ")
	if len(values) < 2 {
		return "", errors.New("error: token not found")
	}

	tokenString := values[1]

	token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
	if err != nil {
		fmt.Println(err)
		return "", errors.New("error: token not found")
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		authClaim = claims["id"].(string)
	} else {
		fmt.Println(err)
	}

	return authClaim, nil
}
