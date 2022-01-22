package handlers

import (
	"fmt"
	"log"
	"net/http"
	"reflect"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/database"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/schemas"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func AddUser(c echo.Context) (err error) {

	u := new(schemas.User)

	if err = c.Bind(u); err != nil {
		return
	}
	u.ID = primitive.NewObjectID()
	//hashing users password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	u.Password = string(hashedPassword)
	u.TimestampAdded = time.Now()
	u.TimestampChanged = time.Now()

	//check if user already exists
	empty := schemas.User{}
	check := schemas.User{}
	database.UsersCollection.FindOne(database.GenerateContext(), bson.M{"username": u.UserName}).Decode(&check)
	if check != empty {
		return c.String(http.StatusUnprocessableEntity, "User already exists")
	}

	result, insertErr := database.UsersCollection.InsertOne(database.GenerateContext(), u)
	if insertErr != nil {
		return c.String(http.StatusUnauthorized, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}
	t, err := createToken(*u)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
		"user":  u,
	})
}

func ListUsers(c echo.Context) error {

	var results []*schemas.User

	cur, err := database.UsersCollection.Find(database.GenerateContext(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(database.GenerateContext()) {
		var elem schemas.User
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, &elem)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	_ = cur.Close(database.GenerateContext())
	return c.JSON(http.StatusOK, results)

}

func UpdateUser(c echo.Context) (err error) {

	u := new(schemas.User)

	if err = c.Bind(u); err != nil {
		return
	}

	result, err := database.UsersCollection.UpdateOne(
		database.GenerateContext(),
		bson.M{"username": u.UserName},
		bson.M{"$set": bson.M{"password": u.Password, "email": u.Email, "timestampchanged": u.TimestampChanged}})

	if err != nil {
		return c.JSON(http.StatusUnauthorized, err)
	} else {
		log.Print("succeded", result)
		return c.JSON(http.StatusOK, result)
	}
}

func LoginUser(c echo.Context) (err error) {

	u := new(schemas.User)
	check := schemas.User{}

	if err = c.Bind(u); err != nil {
		return
	}

	//db check
	database.UsersCollection.FindOne(database.GenerateContext(), bson.M{"username": u.UserName}).Decode(&check)
	hashIsEqual := bcrypt.CompareHashAndPassword([]byte(check.Password), []byte(u.Password))
	if hashIsEqual != nil {
		return c.JSON(http.StatusUnauthorized, nil)
	} else {

		t, err := createToken(check)

		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, echo.Map{
			"token": t,
			"user":  check,
		})
	}
}

func createToken(u schemas.User) (t string, err error) {

	claims := &schemas.JwtCustomClaims{
		Name:  u.UserName,
		Admin: u.IsAdmin,
		Id:    u.ID,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err = token.SignedString([]byte("secret"))

	return t, err
}
