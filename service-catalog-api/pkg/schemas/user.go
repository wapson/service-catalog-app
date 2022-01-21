package schemas

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID               primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	UserName         string             `json:"username" bson:"username" validate:"required"`
	Email            string             `json:"email" bson:"email" validate:"required,email"`
	Password         string             `json:"password" bson:"password" validate:"required,min=6"`
	IsAdmin			bool				`json:"isAdmin" bson:"isAdmin"`
	Token            string             `json:"token" bson:"token"`
	RefreshToken     string             `json:"refreshtoken" bson:"refreshtoken"`
	TimestampAdded   time.Time          `json:"timestampadded" bson:"timestampadded"`
	TimestampChanged time.Time          `json:"timestampchanged" bson:"timestampchanged"`
}
