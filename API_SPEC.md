# REST Interface

**Ignore this guide for now, it's based on a very old spec**

* CRUD
  * GET /table/:table/entity/:key/:row
  * PUT /table/:table/entity/:key/:row
  * POST /table/:table/entity/:key/:row
  * PATCH /table/:table/entity/:key/:row
  * DELETE /table/:table/entity/:key/:row
* SELECT
  * GET /table/:table/select/:key/:row1,:row2,etc
  * POST /table/:table/select
* LIST
  * GET /table/:table/list/:key
* SEARCH
  * POST /table/:table/search
* TABLE CRUD
  * GET /table/:table
  * PUT /table/:table
  * POST /table/:table
  * PATCH /table/:table
  * DELETE /table/:table
* INDEX CRUD
  * GET /table/:table/index/:index
  * PUT /table/:table/index/:index
  * POST /table/:table/index/:index
  * PATCH /table/:table/index/:index
  * DELETE /table/:table/index/:index
* NODES
  * GET /nodes
