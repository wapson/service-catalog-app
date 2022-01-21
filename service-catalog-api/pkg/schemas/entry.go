package schemas

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Label struct {
	ID   uint8
	Name string
}

type Entry struct {
	// ID User ID
	ID                primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	OwnerId           primitive.ObjectID `json:"ownerid" bson:"ownerid"`
	Name              string             `json:"name" bson:"name" validate:"required"`
	Description       string             `json:"description" bson:"description,omitempty" validate:"required"`
	ShortName         string             `json:"shortname" bson:"shortname,omitempty" validate:"required"`
	RepositoryURL     string             `json:"repositoryurl,omitempty" bson:"repositoryurl,omitempty" validate:"required, url"`
	Labels            []string           `json:"labels" bson:"labels" validate:"required"`
	Codeowners        []string           `json:"codeowners,omitempty" bson:"codeowners,omitempty" validate:"required"`
	DocumentationURLs []string           `json:"documentationurls,omitempty" bson:"documentationurls,omitempty" validate:"url"`
	TimestampAdded    time.Time          `json:"timestampadded" bson:"timestampadded"`
	TimestampChanged  time.Time          `json:"timestampchanged" bson:"timestampchanged"`
}

