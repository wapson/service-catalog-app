package schemas

import (
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type JwtCustomClaims struct {
	Id    primitive.ObjectID `json:"id"`
	Name  string             `json:"name"`
	Admin bool               `json:"admin"`
	jwt.StandardClaims
}
