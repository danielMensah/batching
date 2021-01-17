.PHONY: generate build clean migrate deploy install all

# check if dist already exists, if it does, delete then compile
clean:
	if [ -f dist ]; then rm dist; fi && tsc

run: clean
	serverless offline start
