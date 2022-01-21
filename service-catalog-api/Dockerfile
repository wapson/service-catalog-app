FROM golang:1.16.5-alpine3.14 AS builder
RUN mkdir /build
WORKDIR /build
COPY . .
RUN apk add --no-cache git
RUN go build -o service-catalog-api cmd/main.go

FROM alpine
RUN adduser -S -D -H -h /app appuser
USER appuser
COPY --from=builder /build/service-catalog-api /app/
WORKDIR /app
CMD ["./service-catalog-api"]

