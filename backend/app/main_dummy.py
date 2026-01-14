from fastapi import FastAPI #imports FASTAPI class from fastapi library - needed to run backend app

app = FastAPI() #appication object - listens for requests

@app.get("/") # on '/' - the root path - when a get message comes( it does automatically when opening a browser) do the below function
def root():   #normal python function
    return {"message": "SaaS Billing Backend is running"}
