# Targets run the notes/ blog; brunc.io itself lives in blog/.
.PHONY: dev build install test clean
dev build install test clean:
	$(MAKE) -C notes $@
