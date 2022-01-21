package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/database"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/schemas"
	"github.com/wapson/service-catalog-app/service-catalog-api/pkg/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// AddService returns OK to indicate a running service
func AddService(c echo.Context) (err error) {
	e := new(schemas.Entry)

	e.TimestampAdded = time.Now()
	e.TimestampChanged = time.Now()

	token, err := utils.GetAuth(c)

	if err != nil {
		fmt.Println("error")
	}

	e.OwnerId, err = primitive.ObjectIDFromHex(token)

	if err != nil {
		fmt.Println("error")
	}

	if err = c.Bind(e); err != nil {
		return
	}
	e.ID = primitive.NewObjectID()
	// check if service already exists
	check := schemas.Entry{}
	database.ServicesCollection.FindOne(database.GenerateContext(), bson.M{"name": e.Name}).Decode(&check)
	if check.Name != "" {
		return c.String(http.StatusUnprocessableEntity, "Service already exists")
	}

	// check if service name has been provided
	if e.Name == "" {
		return c.String(http.StatusBadRequest, "Service name not provided")
	}

	// Insert value into mongodb
	result, insertErr := database.ServicesCollection.InsertOne(context.TODO(), e)
	if insertErr != nil {
		return c.String(http.StatusUnauthorized, fmt.Sprint(insertErr))
	} else {
		fmt.Println("InsertOne() result type: ", reflect.TypeOf(result))
		fmt.Println("InsertOne() API result:", result)
	}
	return c.JSON(http.StatusCreated, e)

}

func DeleteService(c echo.Context) (err error) {
	e := new(schemas.Entry)

	if err = c.Bind(e); err != nil {
		return
	}
	id, _ := primitive.ObjectIDFromHex(e.ID.Hex())

	deleteResult, err := database.ServicesCollection.DeleteOne(database.GenerateContext(), bson.M{"_id": id})
	if deleteResult.DeletedCount == 0 {
		log.Fatal("Error on deleting one Service", err)
	}
	return c.JSON(http.StatusOK, "Removed")
}

func ListServices(c echo.Context) error {
	page, err := strconv.ParseInt(c.QueryParam("page"), 10, 64)
	var pageSize int64 = 25
	if err != nil {
		return err
	}
	nameFilter := c.QueryParam("name")
	labelFilter := c.QueryParam("label")

	options := options.Find()
	options.SetSkip((page * pageSize) - pageSize)
	options.SetLimit(pageSize)
	options.SetSort(bson.D{primitive.E{Key: "timestampadded", Value: -1}})
	var results []*schemas.Entry

	cur, err := database.ServicesCollection.Find(database.GenerateContext(),
		bson.M{
			"labels": bson.M{
				"$regex": primitive.Regex{
					Pattern: "^.*" + labelFilter + ".*",
					Options: "i",
				}},
			"name": bson.M{
				"$regex": primitive.Regex{
					Pattern: "^.*" + nameFilter + ".*",
					Options: "i",
				}},
		}, options)
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(database.GenerateContext()) {
		var elem schemas.Entry
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

func GetService(c echo.Context) error {

	var results *schemas.Entry

	Name := c.QueryParam("name")

	err := database.ServicesCollection.FindOne(database.GenerateContext(), bson.M{"name": Name}).Decode(&results)
	if err != nil {
		return c.JSON(http.StatusNotFound, err)
	}

	return c.JSON(http.StatusOK, results)

}

func UpdateService(c echo.Context) (err error) {

	e := new(schemas.Entry)

	if err = c.Bind(e); err != nil {
		return
	}

	id, _ := primitive.ObjectIDFromHex(e.ID.Hex())

	result, err := database.ServicesCollection.UpdateOne(
		database.GenerateContext(),
		bson.M{"_id": id},
		bson.M{"$set": bson.M{"name": e.Name, "shortname": e.ShortName, "description": e.Description, "repositoryURL": e.RepositoryURL, "labels": e.Labels, "codeowners": e.Codeowners, "documentationurls": e.DocumentationURLs, "timestampchanged": time.Now()}})

	if err != nil {
		return c.JSON(http.StatusUnauthorized, err)
	} else {
		fmt.Println("UpdateSevice() result type: ", reflect.TypeOf(result))
		fmt.Println("UpdateService() API result:", result)
	}
	log.Print("succeded", result)
	return c.JSON(http.StatusOK, result)
}
