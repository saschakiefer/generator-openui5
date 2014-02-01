var xhr = sinon.useFakeXMLHttpRequest(),
	baseURL = "../../../../../proxy/http/services.odata.org/Northwind/Northwind.svc/",
	responseDelay = 200,
	_setTimeout = window.setTimeout;

xhr.useFilters = true;
xhr.addFilter(function(method, url) {
	return url.indexOf(baseURL) != 0;
});
xhr.onCreate = function(request) {
	request.onSend = function() {
		if (request.url == baseURL + "$metadata") {
			if (request.async === true) {
				_setTimeout(function() {
					request.respond(200, oMetaDataHeaders, sMetaData);
				}, responseDelay);
			} else {
				request.respond(200, oMetaDataHeaders, sMetaData);				
			}
		}
		if (request.url == baseURL + "Categories") {
			if (request.requestHeaders["Accept"] == "application/atom+xml,application/atomsvc+xml,application/xml") {
				_setTimeout(function() {
					request.respond(200, oXMLHeaders, sCategoriesXML)
				}, responseDelay); 
			}
			else {
				_setTimeout(function() { 
					request.respond(200, oJSONHeaders, sCategoriesJSON)
				}, responseDelay);
			}
		}
		if (request.url == baseURL + "Categories/$count") {
			request.respond(200, oCountHeaders, "8");
		}
		if (request.url == baseURL + "Regions") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sRegionsXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Products(2)") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sProducts2XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories(2)") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategories2XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=8&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=8&$orderby=CategoryName%20desc&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesOrderDescXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=8&$orderby=CategoryName%20asc&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesOrderAscXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=8&$expand=Products&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesExpandProductsXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Products(1)?$expand=Category") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sProducts1ExpandCategoryXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=CategoryName%20eq%20%27Beverages%27&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter1XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(CategoryName%20eq%20%27Condiments%27%20or%20substringof(%27ons%27,CategoryName))&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter2XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(CategoryName%20ge%20%27Beverages%27%20and%20CategoryName%20le%20%27D%27)&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter3XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=startswith(CategoryName,%27C%27)%20and%20endswith(Description,%27ngs%27)&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter4XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(CategoryName%20le%20%27Z%27%20and%20CategoryName%20ge%20%27A%27%20and%20CategoryName%20ne%20%27Beverages%27)&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter5XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(CategoryName%20eq%20%27Condiments%27%20or%20CategoryName%20eq%20%27Beverages%27)&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter6XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(CategoryName%20eq%20%27Condiments%27%20or%20CategoryName%20eq%20%27Beverages%27)%20and%20endswith(Description,%27ings%27)&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter7XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories?$skip=0&$top=100&$filter=(((CategoryName%20eq%20%27Beverages%27%20or%20CategoryName%20eq%20%27Dairy%20Products%27%20or%20CategoryName%20eq%20%27Grains%2fCereals%27)%20or%20CategoryID%20eq%203)%20and%20endswith(Description,%27s%27))&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sCategoriesFilter8XML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories(7)/Products?$skip=0&$top=5&$inlinecount=allpages") {
			_setTimeout(function() {
				request.respond(200, oXMLHeaders, sProductsXML)
			}, responseDelay); 
		}
		if (request.url == baseURL + "Categories(7)/Products/$count") {
			request.respond(200, oCountHeaders, "5");
		}
	}
};

var oMetaDataHeaders = {
		"Content-Type": "application/xml;charset=utf-8",
		"DataServiceVersion": "1.0;"
	};
var oXMLHeaders = 	{
		"Content-Type": "application/atom+xml;charset=utf-8",
		"DataServiceVersion": "2.0;"
	};
var oJSONHeaders = 	{
		"Content-Type": "application/json;charset=utf-8",
		"DataServiceVersion": "2.0;"
	};
var oCountHeaders = 	{
		"Content-Type": "text/plain;charset=utf-8",
		"DataServiceVersion": "2.0;"
	};



var sMetaData = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">\
  <edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="1.0">\
    <Schema Namespace="NorthwindModel" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">\
      <EntityType Name="Category">\
        <Key>\
          <PropertyRef Name="CategoryID" />\
        </Key>\
        <Property Name="CategoryID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Description" Type="Edm.String" Nullable="true" MaxLength="Max" Unicode="true" FixedLength="false" />\
        <Property Name="Picture" Type="Edm.Binary" Nullable="true" MaxLength="Max" FixedLength="false" />\
        <NavigationProperty Name="Products" Relationship="NorthwindModel.FK_Products_Categories" FromRole="Categories" ToRole="Products" />\
      </EntityType>\
      <EntityType Name="CustomerDemographic">\
        <Key>\
          <PropertyRef Name="CustomerTypeID" />\
        </Key>\
        <Property Name="CustomerTypeID" Type="Edm.String" Nullable="false" MaxLength="10" Unicode="true" FixedLength="true" />\
        <Property Name="CustomerDesc" Type="Edm.String" Nullable="true" MaxLength="Max" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Customers" Relationship="NorthwindModel.CustomerCustomerDemo" FromRole="CustomerDemographics" ToRole="Customers" />\
      </EntityType>\
      <EntityType Name="Customer">\
        <Key>\
          <PropertyRef Name="CustomerID" />\
        </Key>\
        <Property Name="CustomerID" Type="Edm.String" Nullable="false" MaxLength="5" Unicode="true" FixedLength="true" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ContactName" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="ContactTitle" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="Address" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Region" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Phone" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <Property Name="Fax" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Orders" Relationship="NorthwindModel.FK_Orders_Customers" FromRole="Customers" ToRole="Orders" />\
        <NavigationProperty Name="CustomerDemographics" Relationship="NorthwindModel.CustomerCustomerDemo" FromRole="Customers" ToRole="CustomerDemographics" />\
      </EntityType>\
      <EntityType Name="Employee">\
        <Key>\
          <PropertyRef Name="EmployeeID" />\
        </Key>\
        <Property Name="EmployeeID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="LastName" Type="Edm.String" Nullable="false" MaxLength="20" Unicode="true" FixedLength="false" />\
        <Property Name="FirstName" Type="Edm.String" Nullable="false" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Title" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="TitleOfCourtesy" Type="Edm.String" Nullable="true" MaxLength="25" Unicode="true" FixedLength="false" />\
        <Property Name="BirthDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="HireDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="Address" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Region" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="HomePhone" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <Property Name="Extension" Type="Edm.String" Nullable="true" MaxLength="4" Unicode="true" FixedLength="false" />\
        <Property Name="Photo" Type="Edm.Binary" Nullable="true" MaxLength="Max" FixedLength="false" />\
        <Property Name="Notes" Type="Edm.String" Nullable="true" MaxLength="Max" Unicode="true" FixedLength="false" />\
        <Property Name="ReportsTo" Type="Edm.Int32" Nullable="true" />\
        <Property Name="PhotoPath" Type="Edm.String" Nullable="true" MaxLength="255" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Employees1" Relationship="NorthwindModel.FK_Employees_Employees" FromRole="Employees" ToRole="Employees1" />\
        <NavigationProperty Name="Employee1" Relationship="NorthwindModel.FK_Employees_Employees" FromRole="Employees1" ToRole="Employees" />\
        <NavigationProperty Name="Orders" Relationship="NorthwindModel.FK_Orders_Employees" FromRole="Employees" ToRole="Orders" />\
        <NavigationProperty Name="Territories" Relationship="NorthwindModel.EmployeeTerritories" FromRole="Employees" ToRole="Territories" />\
      </EntityType>\
      <EntityType Name="Order_Detail">\
        <Key>\
          <PropertyRef Name="OrderID" />\
          <PropertyRef Name="ProductID" />\
        </Key>\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false" Precision="19" Scale="4" />\
        <Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
        <Property Name="Discount" Type="Edm.Single" Nullable="false" />\
        <NavigationProperty Name="Order" Relationship="NorthwindModel.FK_Order_Details_Orders" FromRole="Order_Details" ToRole="Orders" />\
        <NavigationProperty Name="Product" Relationship="NorthwindModel.FK_Order_Details_Products" FromRole="Order_Details" ToRole="Products" />\
      </EntityType>\
      <EntityType Name="Order">\
        <Key>\
          <PropertyRef Name="OrderID" />\
        </Key>\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="CustomerID" Type="Edm.String" Nullable="true" MaxLength="5" Unicode="true" FixedLength="true" />\
        <Property Name="EmployeeID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="OrderDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="RequiredDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShipVia" Type="Edm.Int32" Nullable="true" />\
        <Property Name="Freight" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="ShipName" Type="Edm.String" Nullable="true" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ShipAddress" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCity" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipRegion" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipPostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCountry" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Customer" Relationship="NorthwindModel.FK_Orders_Customers" FromRole="Orders" ToRole="Customers" />\
        <NavigationProperty Name="Employee" Relationship="NorthwindModel.FK_Orders_Employees" FromRole="Orders" ToRole="Employees" />\
        <NavigationProperty Name="Order_Details" Relationship="NorthwindModel.FK_Order_Details_Orders" FromRole="Orders" ToRole="Order_Details" />\
        <NavigationProperty Name="Shipper" Relationship="NorthwindModel.FK_Orders_Shippers" FromRole="Orders" ToRole="Shippers" />\
      </EntityType>\
      <EntityType Name="Product">\
        <Key>\
          <PropertyRef Name="ProductID" />\
        </Key>\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="SupplierID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="CategoryID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="QuantityPerUnit" Type="Edm.String" Nullable="true" MaxLength="20" Unicode="true" FixedLength="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="UnitsInStock" Type="Edm.Int16" Nullable="true" />\
        <Property Name="UnitsOnOrder" Type="Edm.Int16" Nullable="true" />\
        <Property Name="ReorderLevel" Type="Edm.Int16" Nullable="true" />\
        <Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
        <NavigationProperty Name="Category" Relationship="NorthwindModel.FK_Products_Categories" FromRole="Products" ToRole="Categories" />\
        <NavigationProperty Name="Order_Details" Relationship="NorthwindModel.FK_Order_Details_Products" FromRole="Products" ToRole="Order_Details" />\
        <NavigationProperty Name="Supplier" Relationship="NorthwindModel.FK_Products_Suppliers" FromRole="Products" ToRole="Suppliers" />\
      </EntityType>\
      <EntityType Name="Region">\
        <Key>\
          <PropertyRef Name="RegionID" />\
        </Key>\
        <Property Name="RegionID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="RegionDescription" Type="Edm.String" Nullable="false" MaxLength="50" Unicode="true" FixedLength="true" />\
        <NavigationProperty Name="Territories" Relationship="NorthwindModel.FK_Territories_Region" FromRole="Region" ToRole="Territories" />\
      </EntityType>\
      <EntityType Name="Shipper">\
        <Key>\
          <PropertyRef Name="ShipperID" />\
        </Key>\
        <Property Name="ShipperID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="Phone" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Orders" Relationship="NorthwindModel.FK_Orders_Shippers" FromRole="Shippers" ToRole="Orders" />\
      </EntityType>\
      <EntityType Name="Supplier">\
        <Key>\
          <PropertyRef Name="SupplierID" />\
        </Key>\
        <Property Name="SupplierID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ContactName" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="ContactTitle" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="Address" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Region" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Phone" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <Property Name="Fax" Type="Edm.String" Nullable="true" MaxLength="24" Unicode="true" FixedLength="false" />\
        <Property Name="HomePage" Type="Edm.String" Nullable="true" MaxLength="Max" Unicode="true" FixedLength="false" />\
        <NavigationProperty Name="Products" Relationship="NorthwindModel.FK_Products_Suppliers" FromRole="Suppliers" ToRole="Products" />\
      </EntityType>\
      <EntityType Name="Territory">\
        <Key>\
          <PropertyRef Name="TerritoryID" />\
        </Key>\
        <Property Name="TerritoryID" Type="Edm.String" Nullable="false" MaxLength="20" Unicode="true" FixedLength="false" />\
        <Property Name="TerritoryDescription" Type="Edm.String" Nullable="false" MaxLength="50" Unicode="true" FixedLength="true" />\
        <Property Name="RegionID" Type="Edm.Int32" Nullable="false" />\
        <NavigationProperty Name="Region" Relationship="NorthwindModel.FK_Territories_Region" FromRole="Territories" ToRole="Region" />\
        <NavigationProperty Name="Employees" Relationship="NorthwindModel.EmployeeTerritories" FromRole="Territories" ToRole="Employees" />\
      </EntityType>\
      <EntityType Name="Alphabetical_list_of_product">\
        <Key>\
          <PropertyRef Name="ProductID" />\
          <PropertyRef Name="ProductName" />\
          <PropertyRef Name="Discontinued" />\
          <PropertyRef Name="CategoryName" />\
        </Key>\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="SupplierID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="CategoryID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="QuantityPerUnit" Type="Edm.String" Nullable="true" MaxLength="20" Unicode="true" FixedLength="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="UnitsInStock" Type="Edm.Int16" Nullable="true" />\
        <Property Name="UnitsOnOrder" Type="Edm.Int16" Nullable="true" />\
        <Property Name="ReorderLevel" Type="Edm.Int16" Nullable="true" />\
        <Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
      </EntityType>\
      <EntityType Name="Category_Sales_for_1997">\
        <Key>\
          <PropertyRef Name="CategoryName" />\
        </Key>\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="CategorySales" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Current_Product_List">\
        <Key>\
          <PropertyRef Name="ProductID" />\
          <PropertyRef Name="ProductName" />\
        </Key>\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" p8:StoreGeneratedPattern="Identity" xmlns:p8="http://schemas.microsoft.com/ado/2009/02/edm/annotation" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
      </EntityType>\
      <EntityType Name="Customer_and_Suppliers_by_City">\
        <Key>\
          <PropertyRef Name="CompanyName" />\
          <PropertyRef Name="Relationship" />\
        </Key>\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ContactName" Type="Edm.String" Nullable="true" MaxLength="30" Unicode="true" FixedLength="false" />\
        <Property Name="Relationship" Type="Edm.String" Nullable="false" MaxLength="9" Unicode="false" FixedLength="false" />\
      </EntityType>\
      <EntityType Name="Invoice">\
        <Key>\
          <PropertyRef Name="CustomerName" />\
          <PropertyRef Name="Salesperson" />\
          <PropertyRef Name="OrderID" />\
          <PropertyRef Name="ShipperName" />\
          <PropertyRef Name="ProductID" />\
          <PropertyRef Name="ProductName" />\
          <PropertyRef Name="UnitPrice" />\
          <PropertyRef Name="Quantity" />\
          <PropertyRef Name="Discount" />\
        </Key>\
        <Property Name="ShipName" Type="Edm.String" Nullable="true" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ShipAddress" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCity" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipRegion" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipPostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCountry" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="CustomerID" Type="Edm.String" Nullable="true" MaxLength="5" Unicode="true" FixedLength="true" />\
        <Property Name="CustomerName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="Address" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Region" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Salesperson" Type="Edm.String" Nullable="false" MaxLength="31" Unicode="true" FixedLength="false" />\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="OrderDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="RequiredDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShipperName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false" Precision="19" Scale="4" />\
        <Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
        <Property Name="Discount" Type="Edm.Single" Nullable="false" />\
        <Property Name="ExtendedPrice" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="Freight" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Order_Details_Extended">\
        <Key>\
          <PropertyRef Name="OrderID" />\
          <PropertyRef Name="ProductID" />\
          <PropertyRef Name="ProductName" />\
          <PropertyRef Name="UnitPrice" />\
          <PropertyRef Name="Quantity" />\
          <PropertyRef Name="Discount" />\
        </Key>\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false" Precision="19" Scale="4" />\
        <Property Name="Quantity" Type="Edm.Int16" Nullable="false" />\
        <Property Name="Discount" Type="Edm.Single" Nullable="false" />\
        <Property Name="ExtendedPrice" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Order_Subtotal">\
        <Key>\
          <PropertyRef Name="OrderID" />\
        </Key>\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="Subtotal" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Orders_Qry">\
        <Key>\
          <PropertyRef Name="OrderID" />\
          <PropertyRef Name="CompanyName" />\
        </Key>\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="CustomerID" Type="Edm.String" Nullable="true" MaxLength="5" Unicode="true" FixedLength="true" />\
        <Property Name="EmployeeID" Type="Edm.Int32" Nullable="true" />\
        <Property Name="OrderDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="RequiredDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="ShipVia" Type="Edm.Int32" Nullable="true" />\
        <Property Name="Freight" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="ShipName" Type="Edm.String" Nullable="true" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ShipAddress" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCity" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipRegion" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ShipPostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="ShipCountry" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="Address" Type="Edm.String" Nullable="true" MaxLength="60" Unicode="true" FixedLength="false" />\
        <Property Name="City" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="Region" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="PostalCode" Type="Edm.String" Nullable="true" MaxLength="10" Unicode="true" FixedLength="false" />\
        <Property Name="Country" Type="Edm.String" Nullable="true" MaxLength="15" Unicode="true" FixedLength="false" />\
      </EntityType>\
      <EntityType Name="Product_Sales_for_1997">\
        <Key>\
          <PropertyRef Name="CategoryName" />\
          <PropertyRef Name="ProductName" />\
        </Key>\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ProductSales" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Products_Above_Average_Price">\
        <Key>\
          <PropertyRef Name="ProductName" />\
        </Key>\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Products_by_Category">\
        <Key>\
          <PropertyRef Name="CategoryName" />\
          <PropertyRef Name="ProductName" />\
          <PropertyRef Name="Discontinued" />\
        </Key>\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="QuantityPerUnit" Type="Edm.String" Nullable="true" MaxLength="20" Unicode="true" FixedLength="false" />\
        <Property Name="UnitsInStock" Type="Edm.Int16" Nullable="true" />\
        <Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />\
      </EntityType>\
      <EntityType Name="Sales_by_Category">\
        <Key>\
          <PropertyRef Name="CategoryID" />\
          <PropertyRef Name="CategoryName" />\
          <PropertyRef Name="ProductName" />\
        </Key>\
        <Property Name="CategoryID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="CategoryName" Type="Edm.String" Nullable="false" MaxLength="15" Unicode="true" FixedLength="false" />\
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ProductSales" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Sales_Totals_by_Amount">\
        <Key>\
          <PropertyRef Name="OrderID" />\
          <PropertyRef Name="CompanyName" />\
        </Key>\
        <Property Name="SaleAmount" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="CompanyName" Type="Edm.String" Nullable="false" MaxLength="40" Unicode="true" FixedLength="false" />\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
      </EntityType>\
      <EntityType Name="Summary_of_Sales_by_Quarter">\
        <Key>\
          <PropertyRef Name="OrderID" />\
        </Key>\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="Subtotal" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <EntityType Name="Summary_of_Sales_by_Year">\
        <Key>\
          <PropertyRef Name="OrderID" />\
        </Key>\
        <Property Name="ShippedDate" Type="Edm.DateTime" Nullable="true" />\
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />\
        <Property Name="Subtotal" Type="Edm.Decimal" Nullable="true" Precision="19" Scale="4" />\
      </EntityType>\
      <Association Name="FK_Products_Categories">\
        <End Role="Categories" Type="NorthwindModel.Category" Multiplicity="0..1" />\
        <End Role="Products" Type="NorthwindModel.Product" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Categories">\
            <PropertyRef Name="CategoryID" />\
          </Principal>\
          <Dependent Role="Products">\
            <PropertyRef Name="CategoryID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Orders_Customers">\
        <End Role="Customers" Type="NorthwindModel.Customer" Multiplicity="0..1" />\
        <End Role="Orders" Type="NorthwindModel.Order" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Customers">\
            <PropertyRef Name="CustomerID" />\
          </Principal>\
          <Dependent Role="Orders">\
            <PropertyRef Name="CustomerID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Employees_Employees">\
        <End Role="Employees" Type="NorthwindModel.Employee" Multiplicity="0..1" />\
        <End Role="Employees1" Type="NorthwindModel.Employee" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Employees">\
            <PropertyRef Name="EmployeeID" />\
          </Principal>\
          <Dependent Role="Employees1">\
            <PropertyRef Name="ReportsTo" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Orders_Employees">\
        <End Role="Employees" Type="NorthwindModel.Employee" Multiplicity="0..1" />\
        <End Role="Orders" Type="NorthwindModel.Order" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Employees">\
            <PropertyRef Name="EmployeeID" />\
          </Principal>\
          <Dependent Role="Orders">\
            <PropertyRef Name="EmployeeID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Order_Details_Orders">\
        <End Role="Orders" Type="NorthwindModel.Order" Multiplicity="1" />\
        <End Role="Order_Details" Type="NorthwindModel.Order_Detail" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Orders">\
            <PropertyRef Name="OrderID" />\
          </Principal>\
          <Dependent Role="Order_Details">\
            <PropertyRef Name="OrderID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Order_Details_Products">\
        <End Role="Products" Type="NorthwindModel.Product" Multiplicity="1" />\
        <End Role="Order_Details" Type="NorthwindModel.Order_Detail" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Products">\
            <PropertyRef Name="ProductID" />\
          </Principal>\
          <Dependent Role="Order_Details">\
            <PropertyRef Name="ProductID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Orders_Shippers">\
        <End Role="Shippers" Type="NorthwindModel.Shipper" Multiplicity="0..1" />\
        <End Role="Orders" Type="NorthwindModel.Order" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Shippers">\
            <PropertyRef Name="ShipperID" />\
          </Principal>\
          <Dependent Role="Orders">\
            <PropertyRef Name="ShipVia" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Products_Suppliers">\
        <End Role="Suppliers" Type="NorthwindModel.Supplier" Multiplicity="0..1" />\
        <End Role="Products" Type="NorthwindModel.Product" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Suppliers">\
            <PropertyRef Name="SupplierID" />\
          </Principal>\
          <Dependent Role="Products">\
            <PropertyRef Name="SupplierID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="FK_Territories_Region">\
        <End Role="Region" Type="NorthwindModel.Region" Multiplicity="1" />\
        <End Role="Territories" Type="NorthwindModel.Territory" Multiplicity="*" />\
        <ReferentialConstraint>\
          <Principal Role="Region">\
            <PropertyRef Name="RegionID" />\
          </Principal>\
          <Dependent Role="Territories">\
            <PropertyRef Name="RegionID" />\
          </Dependent>\
        </ReferentialConstraint>\
      </Association>\
      <Association Name="CustomerCustomerDemo">\
        <End Role="CustomerDemographics" Type="NorthwindModel.CustomerDemographic" Multiplicity="*" />\
        <End Role="Customers" Type="NorthwindModel.Customer" Multiplicity="*" />\
      </Association>\
      <Association Name="EmployeeTerritories">\
        <End Role="Employees" Type="NorthwindModel.Employee" Multiplicity="*" />\
        <End Role="Territories" Type="NorthwindModel.Territory" Multiplicity="*" />\
      </Association>\
    </Schema>\
    <Schema Namespace="ODataWeb.Northwind.Model" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">\
      <EntityContainer Name="NorthwindEntities" p7:LazyLoadingEnabled="true" m:IsDefaultEntityContainer="true" xmlns:p7="http://schemas.microsoft.com/ado/2009/02/edm/annotation">\
        <EntitySet Name="Categories" EntityType="NorthwindModel.Category" />\
        <EntitySet Name="CustomerDemographics" EntityType="NorthwindModel.CustomerDemographic" />\
        <EntitySet Name="Customers" EntityType="NorthwindModel.Customer" />\
        <EntitySet Name="Employees" EntityType="NorthwindModel.Employee" />\
        <EntitySet Name="Order_Details" EntityType="NorthwindModel.Order_Detail" />\
        <EntitySet Name="Orders" EntityType="NorthwindModel.Order" />\
        <EntitySet Name="Products" EntityType="NorthwindModel.Product" />\
        <EntitySet Name="Regions" EntityType="NorthwindModel.Region" />\
        <EntitySet Name="Shippers" EntityType="NorthwindModel.Shipper" />\
        <EntitySet Name="Suppliers" EntityType="NorthwindModel.Supplier" />\
        <EntitySet Name="Territories" EntityType="NorthwindModel.Territory" />\
        <EntitySet Name="Alphabetical_list_of_products" EntityType="NorthwindModel.Alphabetical_list_of_product" />\
        <EntitySet Name="Category_Sales_for_1997" EntityType="NorthwindModel.Category_Sales_for_1997" />\
        <EntitySet Name="Current_Product_Lists" EntityType="NorthwindModel.Current_Product_List" />\
\
        <EntitySet Name="Customer_and_Suppliers_by_Cities" EntityType="NorthwindModel.Customer_and_Suppliers_by_City" />\
        <EntitySet Name="Invoices" EntityType="NorthwindModel.Invoice" />\
        <EntitySet Name="Order_Details_Extendeds" EntityType="NorthwindModel.Order_Details_Extended" />\
        <EntitySet Name="Order_Subtotals" EntityType="NorthwindModel.Order_Subtotal" />\
        <EntitySet Name="Orders_Qries" EntityType="NorthwindModel.Orders_Qry" />\
        <EntitySet Name="Product_Sales_for_1997" EntityType="NorthwindModel.Product_Sales_for_1997" />\
        <EntitySet Name="Products_Above_Average_Prices" EntityType="NorthwindModel.Products_Above_Average_Price" />\
        <EntitySet Name="Products_by_Categories" EntityType="NorthwindModel.Products_by_Category" />\
        <EntitySet Name="Sales_by_Categories" EntityType="NorthwindModel.Sales_by_Category" />\
        <EntitySet Name="Sales_Totals_by_Amounts" EntityType="NorthwindModel.Sales_Totals_by_Amount" />\
        <EntitySet Name="Summary_of_Sales_by_Quarters" EntityType="NorthwindModel.Summary_of_Sales_by_Quarter" />\
        <EntitySet Name="Summary_of_Sales_by_Years" EntityType="NorthwindModel.Summary_of_Sales_by_Year" />\
        <AssociationSet Name="FK_Products_Categories" Association="NorthwindModel.FK_Products_Categories">\
          <End Role="Categories" EntitySet="Categories" />\
          <End Role="Products" EntitySet="Products" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Orders_Customers" Association="NorthwindModel.FK_Orders_Customers">\
          <End Role="Customers" EntitySet="Customers" />\
          <End Role="Orders" EntitySet="Orders" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Employees_Employees" Association="NorthwindModel.FK_Employees_Employees">\
          <End Role="Employees" EntitySet="Employees" />\
          <End Role="Employees1" EntitySet="Employees" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Orders_Employees" Association="NorthwindModel.FK_Orders_Employees">\
          <End Role="Employees" EntitySet="Employees" />\
          <End Role="Orders" EntitySet="Orders" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Order_Details_Orders" Association="NorthwindModel.FK_Order_Details_Orders">\
          <End Role="Orders" EntitySet="Orders" />\
          <End Role="Order_Details" EntitySet="Order_Details" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Order_Details_Products" Association="NorthwindModel.FK_Order_Details_Products">\
          <End Role="Products" EntitySet="Products" />\
          <End Role="Order_Details" EntitySet="Order_Details" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Orders_Shippers" Association="NorthwindModel.FK_Orders_Shippers">\
          <End Role="Shippers" EntitySet="Shippers" />\
          <End Role="Orders" EntitySet="Orders" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Products_Suppliers" Association="NorthwindModel.FK_Products_Suppliers">\
          <End Role="Suppliers" EntitySet="Suppliers" />\
          <End Role="Products" EntitySet="Products" />\
        </AssociationSet>\
        <AssociationSet Name="FK_Territories_Region" Association="NorthwindModel.FK_Territories_Region">\
          <End Role="Region" EntitySet="Regions" />\
          <End Role="Territories" EntitySet="Territories" />\
        </AssociationSet>\
        <AssociationSet Name="CustomerCustomerDemo" Association="NorthwindModel.CustomerCustomerDemo">\
          <End Role="CustomerDemographics" EntitySet="CustomerDemographics" />\
          <End Role="Customers" EntitySet="Customers" />\
        </AssociationSet>\
        <AssociationSet Name="EmployeeTerritories" Association="NorthwindModel.EmployeeTerritories">\
          <End Role="Employees" EntitySet="Employees" />\
          <End Role="Territories" EntitySet="Territories" />\
        </AssociationSet>\
      </EntityContainer>\
    </Schema>\
  </edmx:DataServices>\
</edmx:Edmx>\
	';

var sCategoriesXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-01-31T14:16:20Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
	<m:count>8</m:count>\
	<entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(5)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
        <d:CategoryName>Grains/Cereals</d:CategoryName>\
        <d:Description>Breads, crackers, pasta, and cereal</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(6)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
        <d:CategoryName>Meat/Poultry</d:CategoryName>\
        <d:Description>Prepared meats</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(7)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
        <d:CategoryName>Produce</d:CategoryName>\
        <d:Description>Dried fruit and bean curd</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T14:16:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(8)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
        <d:CategoryName>Seafood</d:CategoryName>\
        <d:Description>Seaweed and fish</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sCategoriesJSON = '\
{\
"d" : {\
"results": [\
{\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)", "type": "NorthwindModel.Category"\
}, "CategoryID": 1, "CategoryName": "Beverages", "Description": "Soft drinks, coffees, teas, beers, and ales"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)", "type": "NorthwindModel.Category"\
}, "CategoryID": 2, "CategoryName": "Condiments", "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)", "type": "NorthwindModel.Category"\
}, "CategoryID": 3, "CategoryName": "Confections", "Description": "Desserts, candies, and sweet breads"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)", "type": "NorthwindModel.Category"\
}, "CategoryID": 4, "CategoryName": "Dairy Products", "Description": "Cheeses"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)", "type": "NorthwindModel.Category"\
}, "CategoryID": 5, "CategoryName": "Grains/Cereals", "Description": "Breads, crackers, pasta, and cereal"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)", "type": "NorthwindModel.Category"\
}, "CategoryID": 6, "CategoryName": "Meat/Poultry", "Description": "Prepared meats"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)", "type": "NorthwindModel.Category"\
}, "CategoryID": 7, "CategoryName": "Produce", "Description": "Dried fruit and bean curd"\
}, {\
"__metadata": {\
"uri": "http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)", "type": "NorthwindModel.Category"\
}, "CategoryID": 8, "CategoryName": "Seafood", "Description": "Seaweed and fish"\
}\
]\
}\
}\
	';

var sRegionsXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Regions</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Regions</id>\
  <updated>2013-01-31T08:51:31Z</updated>\
  <link rel="self" title="Regions" href="Regions" />\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Regions(1)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T08:51:31Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Region" href="Regions(1)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories" type="application/atom+xml;type=feed" title="Territories" href="Regions(1)/Territories" />\
    <category term="NorthwindModel.Region" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:RegionID m:type="Edm.Int32">1</d:RegionID>\
        <d:RegionDescription xml:space="preserve">Eastern                                           </d:RegionDescription>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Regions(2)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T08:51:31Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Region" href="Regions(2)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories" type="application/atom+xml;type=feed" title="Territories" href="Regions(2)/Territories" />\
    <category term="NorthwindModel.Region" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:RegionID m:type="Edm.Int32">2</d:RegionID>\
        <d:RegionDescription xml:space="preserve">Western                                           </d:RegionDescription>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Regions(3)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T08:51:31Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Region" href="Regions(3)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories" type="application/atom+xml;type=feed" title="Territories" href="Regions(3)/Territories" />\
    <category term="NorthwindModel.Region" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:RegionID m:type="Edm.Int32">3</d:RegionID>\
        <d:RegionDescription xml:space="preserve">Northern                                          </d:RegionDescription>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Regions(4)</id>\
    <title type="text"></title>\
    <updated>2013-01-31T08:51:31Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Region" href="Regions(4)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Territories" type="application/atom+xml;type=feed" title="Territories" href="Regions(4)/Territories" />\
    <category term="NorthwindModel.Region" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:RegionID m:type="Edm.Int32">4</d:RegionID>\
        <d:RegionDescription xml:space="preserve">Southern                                          </d:RegionDescription>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sProducts2XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<entry xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(2)</id>\
  <title type="text"></title>\
  <updated>2013-01-31T08:51:33Z</updated>\
  <author>\
    <name />\
  </author>\
  <link rel="edit" title="Product" href="Products(2)" />\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(2)/Category" />\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(2)/Order_Details" />\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(2)/Supplier" />\
  <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
  <content type="application/xml">\
    <m:properties>\
      <d:ProductID m:type="Edm.Int32">2</d:ProductID>\
      <d:ProductName>Chang</d:ProductName>\
      <d:SupplierID m:type="Edm.Int32">1</d:SupplierID>\
      <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
      <d:QuantityPerUnit>24 - 12 oz bottles</d:QuantityPerUnit>\
      <d:UnitPrice m:type="Edm.Decimal">19.0000</d:UnitPrice>\
      <d:UnitsInStock m:type="Edm.Int16">17</d:UnitsInStock>\
      <d:UnitsOnOrder m:type="Edm.Int16">40</d:UnitsOnOrder>\
      <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
      <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
    </m:properties>\
  </content>\
</entry>\
	';

var sCategoriesOrderDescXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T11:42:05Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>8</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(8)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
        <d:CategoryName>Seafood</d:CategoryName>\
        <d:Description>Seaweed and fish</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(7)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
        <d:CategoryName>Produce</d:CategoryName>\
        <d:Description>Dried fruit and bean curd</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(6)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
        <d:CategoryName>Meat/Poultry</d:CategoryName>\
        <d:Description>Prepared meats</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(5)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
        <d:CategoryName>Grains/Cereals</d:CategoryName>\
        <d:Description>Breads, crackers, pasta, and cereal</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:05Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sCategoriesOrderAscXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T11:42:56Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>8</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(5)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
        <d:CategoryName>Grains/Cereals</d:CategoryName>\
        <d:Description>Breads, crackers, pasta, and cereal</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(6)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
        <d:CategoryName>Meat/Poultry</d:CategoryName>\
        <d:Description>Prepared meats</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(7)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
        <d:CategoryName>Produce</d:CategoryName>\
        <d:Description>Dried fruit and bean curd</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T11:42:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(8)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
        <d:CategoryName>Seafood</d:CategoryName>\
        <d:Description>Seaweed and fish</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';


var sCategoriesExpandProductsXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:06:01Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>8</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(1)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(1)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(1)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(1)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(1)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(1)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(1)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">1</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chai</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">1</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 boxes x 20 bags</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">18.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">39</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(2)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(2)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(2)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(2)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(2)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">2</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chang</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">1</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 12 oz bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">19.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">17</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">40</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(24)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(24)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(24)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(24)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(24)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">24</d:ProductID>\
                <d:ProductName m:type="Edm.String">Guaraná Fantástica</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">10</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 355 ml cans</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">4.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">20</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(34)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(34)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(34)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(34)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(34)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">34</d:ProductID>\
                <d:ProductName m:type="Edm.String">Sasquatch Ale</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">16</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 12 oz bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">14.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">111</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(35)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(35)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(35)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(35)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(35)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">35</d:ProductID>\
                <d:ProductName m:type="Edm.String">Steeleye Stout</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">16</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 12 oz bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">18.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">20</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(38)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(38)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(38)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(38)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(38)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">38</d:ProductID>\
                <d:ProductName m:type="Edm.String">Côte de Blaye</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">18</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 75 cl bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">263.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">17</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(39)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(39)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(39)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(39)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(39)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">39</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chartreuse verte</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">18</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">750 cc per bottle</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">18.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">69</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(43)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(43)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(43)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(43)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(43)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">43</d:ProductID>\
                <d:ProductName m:type="Edm.String">Ipoh Coffee</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">20</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">16 - 500 g tins</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">46.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">17</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">10</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(67)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(67)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(67)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(67)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(67)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">67</d:ProductID>\
                <d:ProductName m:type="Edm.String">Laughing Lumberjack Lager</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">16</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 12 oz bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">14.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">52</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(70)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(70)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(70)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(70)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(70)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">70</d:ProductID>\
                <d:ProductName m:type="Edm.String">Outback Lager</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">7</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 355 ml bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">15.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">15</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">10</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(75)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(75)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(75)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(75)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(75)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">75</d:ProductID>\
                <d:ProductName m:type="Edm.String">Rhönbräu Klosterbier</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">12</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 0.5 l bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">7.7500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">125</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(76)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(76)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(76)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(76)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(76)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">76</d:ProductID>\
                <d:ProductName m:type="Edm.String">Lakkalikööri</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">23</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">500 ml</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">18.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">57</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(2)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(2)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(3)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(3)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(3)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(3)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(3)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">3</d:ProductID>\
                <d:ProductName m:type="Edm.String">Aniseed Syrup</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">1</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 550 ml bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">10.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">13</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">70</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(4)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(4)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(4)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(4)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(4)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">4</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chef Anton\'s Cajun Seasoning</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">2</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">48 - 6 oz jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">22.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">53</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(5)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(5)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(5)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(5)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(5)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">5</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chef Anton\'s Gumbo Mix</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">2</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">36 boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">21.3500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">0</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(6)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(6)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(6)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(6)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(6)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">6</d:ProductID>\
                <d:ProductName m:type="Edm.String">Grandma\'s Boysenberry Spread</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">3</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 8 oz jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">25.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">120</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(8)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(8)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(8)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(8)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(8)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">8</d:ProductID>\
                <d:ProductName m:type="Edm.String">Northwoods Cranberry Sauce</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">3</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 12 oz jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">40.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">6</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(15)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(15)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(15)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(15)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(15)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">15</d:ProductID>\
                <d:ProductName m:type="Edm.String">Genen Shouyu</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">6</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 250 ml bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">15.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">39</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(44)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(44)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(44)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(44)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(44)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">44</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gula Malacca</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">20</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">20 - 2 kg bags</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">19.4500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">27</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(61)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(61)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(61)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(61)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(61)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">61</d:ProductID>\
                <d:ProductName m:type="Edm.String">Sirop d\'érable</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">29</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 500 ml bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">28.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">113</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(63)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(63)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(63)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(63)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(63)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">63</d:ProductID>\
                <d:ProductName m:type="Edm.String">Vegie-spread</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">7</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">15 - 625 g jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">43.9000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">24</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(65)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(65)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(65)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(65)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(65)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">65</d:ProductID>\
                <d:ProductName m:type="Edm.String">Louisiana Fiery Hot Pepper Sauce</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">2</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">32 - 8 oz bottles</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">21.0500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">76</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(66)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(66)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(66)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(66)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(66)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">66</d:ProductID>\
                <d:ProductName m:type="Edm.String">Louisiana Hot Spiced Okra</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">2</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 8 oz jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">17.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">4</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">100</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(77)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(77)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(77)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(77)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(77)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">77</d:ProductID>\
                <d:ProductName m:type="Edm.String">Original Frankfurter grüne Soße</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">12</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">13.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">32</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(3)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(3)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(16)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(16)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(16)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(16)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(16)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">16</d:ProductID>\
                <d:ProductName m:type="Edm.String">Pavlova</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">7</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">32 - 500 g boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">17.4500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">29</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(19)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(19)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(19)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(19)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(19)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">19</d:ProductID>\
                <d:ProductName m:type="Edm.String">Teatime Chocolate Biscuits</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">8</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 boxes x 12 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">9.2000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">25</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(20)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(20)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(20)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(20)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(20)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">20</d:ProductID>\
                <d:ProductName m:type="Edm.String">Sir Rodney\'s Marmalade</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">8</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">30 gift boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">81.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">40</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(21)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(21)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(21)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(21)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(21)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">21</d:ProductID>\
                <d:ProductName m:type="Edm.String">Sir Rodney\'s Scones</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">8</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 pkgs. x 4 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">10.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">3</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">40</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(25)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(25)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(25)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(25)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(25)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">25</d:ProductID>\
                <d:ProductName m:type="Edm.String">NuNuCa Nuß-Nougat-Creme</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">11</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">20 - 450 g glasses</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">14.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">76</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(26)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(26)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(26)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(26)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(26)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">26</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gumbär Gummibärchen</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">11</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">100 - 250 g bags</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">31.2300</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">15</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(27)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(27)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(27)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(27)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(27)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">27</d:ProductID>\
                <d:ProductName m:type="Edm.String">Schoggi Schokolade</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">11</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">100 - 100 g pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">43.9000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">49</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(47)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(47)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(47)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(47)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(47)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">47</d:ProductID>\
                <d:ProductName m:type="Edm.String">Zaanse koeken</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">22</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 - 4 oz boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">9.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">36</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(48)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(48)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(48)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(48)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(48)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">48</d:ProductID>\
                <d:ProductName m:type="Edm.String">Chocolade</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">22</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">12.7500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">15</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">70</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(49)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(49)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(49)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(49)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(49)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">49</d:ProductID>\
                <d:ProductName m:type="Edm.String">Maxilaku</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">23</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 50 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">20.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">10</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">60</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(50)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(50)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(50)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(50)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(50)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">50</d:ProductID>\
                <d:ProductName m:type="Edm.String">Valkoinen suklaa</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">23</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 100 g bars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">16.2500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">65</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(62)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(62)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(62)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(62)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(62)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">62</d:ProductID>\
                <d:ProductName m:type="Edm.String">Tarte au sucre</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">29</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">48 pies</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">49.3000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">17</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(68)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(68)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(68)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(68)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(68)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">68</d:ProductID>\
                <d:ProductName m:type="Edm.String">Scottish Longbreads</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">8</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 boxes x 8 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">12.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">6</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">10</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(4)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(4)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(11)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(11)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(11)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(11)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(11)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">11</d:ProductID>\
                <d:ProductName m:type="Edm.String">Queso Cabrales</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">5</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">1 kg pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">21.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">22</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">30</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(12)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(12)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(12)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(12)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(12)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">12</d:ProductID>\
                <d:ProductName m:type="Edm.String">Queso Manchego La Pastora</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">5</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 - 500 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">38.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">86</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(31)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(31)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(31)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(31)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(31)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">31</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gorgonzola Telino</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">14</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 100 g pkgs</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">12.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">0</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">70</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(32)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(32)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(32)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(32)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(32)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">32</d:ProductID>\
                <d:ProductName m:type="Edm.String">Mascarpone Fabioli</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">14</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 200 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">32.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">9</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">40</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(33)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(33)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(33)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(33)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(33)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">33</d:ProductID>\
                <d:ProductName m:type="Edm.String">Geitost</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">15</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">500 g</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">2.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">112</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(59)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(59)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(59)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(59)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(59)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">59</d:ProductID>\
                <d:ProductName m:type="Edm.String">Raclette Courdavault</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">28</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">5 kg pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">55.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">79</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(60)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(60)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(60)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(60)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(60)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">60</d:ProductID>\
                <d:ProductName m:type="Edm.String">Camembert Pierrot</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">28</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">15 - 300 g rounds</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">34.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">19</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(69)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(69)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(69)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(69)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(69)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">69</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gudbrandsdalsost</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">15</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 kg pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">36.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">26</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(71)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(71)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(71)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(71)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(71)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">71</d:ProductID>\
                <d:ProductName m:type="Edm.String">Flotemysost</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">15</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 - 500 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">21.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">26</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(72)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(72)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(72)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(72)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(72)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">72</d:ProductID>\
                <d:ProductName m:type="Edm.String">Mozzarella di Giovanni</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">14</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 200 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">34.8000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">14</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(5)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(5)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(5)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(22)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(22)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(22)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(22)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(22)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">22</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gustaf\'s Knäckebröd</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">9</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 500 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">21.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">104</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(23)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(23)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(23)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(23)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(23)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">23</d:ProductID>\
                <d:ProductName m:type="Edm.String">Tunnbröd</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">9</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 250 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">9.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">61</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(42)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(42)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(42)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(42)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(42)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">42</d:ProductID>\
                <d:ProductName m:type="Edm.String">Singaporean Hokkien Fried Mee</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">20</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">32 - 1 kg pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">14.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">26</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(52)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(52)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(52)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(52)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(52)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">52</d:ProductID>\
                <d:ProductName m:type="Edm.String">Filo Mix</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">24</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">16 - 2 kg boxes</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">7.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">38</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(56)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(56)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(56)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(56)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(56)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">56</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gnocchi di nonna Alice</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">26</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 250 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">38.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">21</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">10</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(57)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(57)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(57)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(57)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(57)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">57</d:ProductID>\
                <d:ProductName m:type="Edm.String">Ravioli Angelo</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">26</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 250 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">19.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">36</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(64)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(64)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(64)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(64)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(64)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">64</d:ProductID>\
                <d:ProductName m:type="Edm.String">Wimmers gute Semmelknödel</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">12</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">20 bags x 4 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">33.2500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">22</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">80</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
        <d:CategoryName>Grains/Cereals</d:CategoryName>\
        <d:Description>Breads, crackers, pasta, and cereal</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(6)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(6)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(6)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(9)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(9)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(9)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(9)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(9)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">9</d:ProductID>\
                <d:ProductName m:type="Edm.String">Mishi Kobe Niku</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">4</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">18 - 500 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">97.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">29</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(17)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(17)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(17)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(17)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(17)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">17</d:ProductID>\
                <d:ProductName m:type="Edm.String">Alice Mutton</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">7</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">20 - 1 kg tins</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">39.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">0</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(29)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(29)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(29)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(29)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(29)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">29</d:ProductID>\
                <d:ProductName m:type="Edm.String">Thüringer Rostbratwurst</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">12</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">50 bags x 30 sausgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">123.7900</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">0</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(53)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(53)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(53)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(53)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(53)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">53</d:ProductID>\
                <d:ProductName m:type="Edm.String">Perth Pasties</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">24</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">48 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">32.8000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">0</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(54)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(54)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(54)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(54)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(54)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">54</d:ProductID>\
                <d:ProductName m:type="Edm.String">Tourtière</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">25</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">16 pies</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">7.4500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">21</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(55)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(55)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(55)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(55)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(55)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">55</d:ProductID>\
                <d:ProductName m:type="Edm.String">Pâté chinois</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">25</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 boxes x 2 pies</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">24.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">115</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
        <d:CategoryName>Meat/Poultry</d:CategoryName>\
        <d:Description>Prepared meats</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(7)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(7)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(7)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(7)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(7)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(7)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(7)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(7)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">7</d:ProductID>\
                <d:ProductName m:type="Edm.String">Uncle Bob\'s Organic Dried Pears</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">3</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 1 lb pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">30.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">15</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(14)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(14)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(14)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(14)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(14)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">14</d:ProductID>\
                <d:ProductName m:type="Edm.String">Tofu</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">6</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">40 - 100 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">23.2500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">35</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(28)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(28)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(28)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(28)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(28)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">28</d:ProductID>\
                <d:ProductName m:type="Edm.String">Rössle Sauerkraut</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">12</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">25 - 825 g cans</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">45.6000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">26</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">true</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(51)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(51)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(51)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(51)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(51)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">51</d:ProductID>\
                <d:ProductName m:type="Edm.String">Manjimup Dried Apples</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">24</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">50 - 300 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">53.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">20</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(74)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(74)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(74)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(74)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(74)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">74</d:ProductID>\
                <d:ProductName m:type="Edm.String">Longlife Tofu</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">4</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">5 kg pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">10.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">4</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">20</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
        <d:CategoryName>Produce</d:CategoryName>\
        <d:Description>Dried fruit and bean curd</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:06:01Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(8)" />\
    <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(8)/Products">\
      <m:inline>\
        <feed>\
          <title type="text">Products</title>\
          <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)/Products</id>\
          <updated>2013-02-01T12:06:01Z</updated>\
          <link rel="self" title="Products" href="Categories(8)/Products" />\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(10)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(10)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(10)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(10)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(10)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">10</d:ProductID>\
                <d:ProductName m:type="Edm.String">Ikura</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">4</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 200 ml jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">31.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">31</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(13)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(13)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(13)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(13)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(13)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">13</d:ProductID>\
                <d:ProductName m:type="Edm.String">Konbu</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">6</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">2 kg box</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">6.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">24</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(18)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(18)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(18)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(18)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(18)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">18</d:ProductID>\
                <d:ProductName m:type="Edm.String">Carnarvon Tigers</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">7</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">16 kg pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">62.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">42</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(30)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(30)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(30)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(30)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(30)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">30</d:ProductID>\
                <d:ProductName m:type="Edm.String">Nord-Ost Matjeshering</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">13</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">10 - 200 g glasses</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">25.8900</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">10</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(36)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(36)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(36)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(36)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(36)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">36</d:ProductID>\
                <d:ProductName m:type="Edm.String">Inlagd Sill</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">17</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 250 g  jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">19.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">112</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(37)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(37)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(37)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(37)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(37)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">37</d:ProductID>\
                <d:ProductName m:type="Edm.String">Gravad lax</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">17</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 500 g pkgs.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">26.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">11</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">50</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">25</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(40)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(40)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(40)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(40)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(40)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">40</d:ProductID>\
                <d:ProductName m:type="Edm.String">Boston Crab Meat</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">19</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 4 oz tins</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">18.4000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">123</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">30</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(41)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(41)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(41)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(41)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(41)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">41</d:ProductID>\
                <d:ProductName m:type="Edm.String">Jack\'s New England Clam Chowder</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">19</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">12 - 12 oz cans</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">9.6500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">85</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(45)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(45)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(45)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(45)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(45)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">45</d:ProductID>\
                <d:ProductName m:type="Edm.String">Rogede sild</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">21</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">1k pkg.</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">9.5000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">5</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">70</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">15</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(46)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(46)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(46)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(46)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(46)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">46</d:ProductID>\
                <d:ProductName m:type="Edm.String">Spegesild</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">21</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">4 - 450 g glasses</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">12.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">95</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">0</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(58)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(58)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(58)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(58)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(58)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">58</d:ProductID>\
                <d:ProductName m:type="Edm.String">Escargots de Bourgogne</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">27</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 pieces</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">13.2500</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">62</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">20</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
          <entry>\
            <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(73)</id>\
            <title type="text"></title>\
            <updated>2013-02-01T12:06:01Z</updated>\
            <author>\
              <name />\
            </author>\
            <link rel="edit" title="Product" href="Products(73)" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(73)/Category" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(73)/Order_Details" />\
            <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(73)/Supplier" />\
            <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
            <content type="application/xml">\
              <m:properties>\
                <d:ProductID m:type="Edm.Int32">73</d:ProductID>\
                <d:ProductName m:type="Edm.String">Röd Kaviar</d:ProductName>\
                <d:SupplierID m:type="Edm.Int32">17</d:SupplierID>\
                <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
                <d:QuantityPerUnit m:type="Edm.String">24 - 150 g jars</d:QuantityPerUnit>\
                <d:UnitPrice m:type="Edm.Decimal">15.0000</d:UnitPrice>\
                <d:UnitsInStock m:type="Edm.Int16">101</d:UnitsInStock>\
                <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
                <d:ReorderLevel m:type="Edm.Int16">5</d:ReorderLevel>\
                <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
              </m:properties>\
            </content>\
          </entry>\
        </feed>\
      </m:inline>\
    </link>\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
        <d:CategoryName>Seafood</d:CategoryName>\
        <d:Description>Seaweed and fish</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sProducts1ExpandCategoryXML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<entry xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(1)</id>\
  <title type="text"></title>\
  <updated>2013-02-01T11:36:35Z</updated>\
  <author>\
    <name />\
  </author>\
  <link rel="edit" title="Product" href="Products(1)" />\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category" type="application/atom+xml;type=entry" title="Category" href="Products(1)/Category">\
    <m:inline>\
      <entry>\
        <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
        <title type="text"></title>\
        <updated>2013-02-01T11:36:35Z</updated>\
        <author>\
          <name />\
        </author>\
        <link rel="edit" title="Category" href="Categories(1)" />\
        <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products" type="application/atom+xml;type=feed" title="Products" href="Categories(1)/Products" />\
        <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
        <content type="application/xml">\
          <m:properties>\
            <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
            <d:CategoryName m:type="Edm.String">Beverages</d:CategoryName>\
            <d:Description m:type="Edm.String">Soft drinks, coffees, teas, beers, and ales</d:Description>\
          </m:properties>\
        </content>\
      </entry>\
    </m:inline>\
  </link>\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details" type="application/atom+xml;type=feed" title="Order_Details" href="Products(1)/Order_Details" />\
  <link rel="http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier" type="application/atom+xml;type=entry" title="Supplier" href="Products(1)/Supplier" />\
  <category term="NorthwindModel.Product" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
  <content type="application/xml">\
    <m:properties>\
      <d:ProductID m:type="Edm.Int32">1</d:ProductID>\
      <d:ProductName m:type="Edm.String">Chai</d:ProductName>\
      <d:SupplierID m:type="Edm.Int32">1</d:SupplierID>\
      <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
      <d:QuantityPerUnit m:type="Edm.String">10 boxes x 20 bags</d:QuantityPerUnit>\
      <d:UnitPrice m:type="Edm.Decimal">18.0000</d:UnitPrice>\
      <d:UnitsInStock m:type="Edm.Int16">39</d:UnitsInStock>\
      <d:UnitsOnOrder m:type="Edm.Int16">0</d:UnitsOnOrder>\
      <d:ReorderLevel m:type="Edm.Int16">10</d:ReorderLevel>\
      <d:Discontinued m:type="Edm.Boolean">false</d:Discontinued>\
    </m:properties>\
  </content>\
</entry>\
	';

var sCategoriesFilter1XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:25:29Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>1</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:25:29Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sCategoriesFilter2XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:26:39Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>2</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:26:39Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:26:39Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sCategoriesFilter3XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:27:21Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>3</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:25:29Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:27:21Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:27:21Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sCategoriesFilter4XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:27:56Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>1</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:27:56Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sCategoriesFilter5XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:29:35Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>7</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(3)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(4)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(5)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(5)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">5</d:CategoryID>\
        <d:CategoryName>Grains/Cereals</d:CategoryName>\
        <d:Description>Breads, crackers, pasta, and cereal</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(6)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(6)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">6</d:CategoryID>\
        <d:CategoryName>Meat/Poultry</d:CategoryName>\
        <d:Description>Prepared meats</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(7)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">7</d:CategoryID>\
        <d:CategoryName>Produce</d:CategoryName>\
        <d:Description>Dried fruit and bean curd</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(8)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:29:35Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(8)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">8</d:CategoryID>\
        <d:CategoryName>Seafood</d:CategoryName>\
        <d:Description>Seaweed and fish</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sCategoriesFilter6XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:31:20Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>2</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(1)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:20Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sCategoriesFilter7XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:31:50Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>1</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:50Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(2)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">2</d:CategoryID>\
        <d:CategoryName>Condiments</d:CategoryName>\
        <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';

var sCategoriesFilter8XML = '\
<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
<feed xml:base="http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns="http://www.w3.org/2005/Atom">\
  <title type="text">Categories</title>\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories</id>\
  <updated>2013-02-01T12:31:50Z</updated>\
  <link rel="self" title="Categories" href="Categories" />\
  <m:count>1</m:count>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:50Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(1)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">1</d:CategoryID>\
        <d:CategoryName>Beverages</d:CategoryName>\
        <d:Description>Soft drinks, coffees, teas, beers, and ales</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:50Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(3)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">3</d:CategoryID>\
        <d:CategoryName>Confections</d:CategoryName>\
        <d:Description>Desserts, candies, and sweet breads</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
  <entry>\
    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
    <title type="text"></title>\
    <updated>2013-02-01T12:31:50Z</updated>\
    <author>\
      <name />\
    </author>\
    <link rel="edit" title="Category" href="Categories(4)" />\
    <category term="NorthwindModel.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />\
    <content type="application/xml">\
      <m:properties>\
        <d:CategoryID m:type="Edm.Int32">4</d:CategoryID>\
        <d:CategoryName>Dairy Products</d:CategoryName>\
        <d:Description>Cheeses</d:Description>\
      </m:properties>\
    </content>\
  </entry>\
</feed>\
	';
	
var sProductsXML = "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>\n" + 
		"<feed xml:base=\"http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" xmlns=\"http://www.w3.org/2005/Atom\">\n" + 
		"  <title type=\"text\">Products</title>\n" + 
		"  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(7)/Products</id>\n" + 
		"  <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"  <link rel=\"self\" title=\"Products\" href=\"Products\" />\n" + 
		"  <m:count>5</m:count>\n" + 
		"  <entry>\n" + 
		"    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(7)</id>\n" + 
		"    <title type=\"text\"></title>\n" + 
		"    <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"    <author>\n" + 
		"      <name />\n" + 
		"    </author>\n" + 
		"    <link rel=\"edit\" title=\"Product\" href=\"Products(7)\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category\" type=\"application/atom+xml;type=entry\" title=\"Category\" href=\"Products(7)/Category\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details\" type=\"application/atom+xml;type=feed\" title=\"Order_Details\" href=\"Products(7)/Order_Details\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier\" type=\"application/atom+xml;type=entry\" title=\"Supplier\" href=\"Products(7)/Supplier\" />\n" + 
		"    <category term=\"NorthwindModel.Product\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\n" + 
		"    <content type=\"application/xml\">\n" + 
		"      <m:properties>\n" + 
		"        <d:ProductID m:type=\"Edm.Int32\">7</d:ProductID>\n" + 
		"        <d:ProductName>Uncle Bob\'s Organic Dried Pears</d:ProductName>\n" + 
		"        <d:SupplierID m:type=\"Edm.Int32\">3</d:SupplierID>\n" + 
		"        <d:CategoryID m:type=\"Edm.Int32\">7</d:CategoryID>\n" + 
		"        <d:QuantityPerUnit>12 - 1 lb pkgs.</d:QuantityPerUnit>\n" + 
		"        <d:UnitPrice m:type=\"Edm.Decimal\">30.0000</d:UnitPrice>\n" + 
		"        <d:UnitsInStock m:type=\"Edm.Int16\">15</d:UnitsInStock>\n" + 
		"        <d:UnitsOnOrder m:type=\"Edm.Int16\">0</d:UnitsOnOrder>\n" + 
		"        <d:ReorderLevel m:type=\"Edm.Int16\">10</d:ReorderLevel>\n" + 
		"        <d:Discontinued m:type=\"Edm.Boolean\">false</d:Discontinued>\n" + 
		"      </m:properties>\n" + 
		"    </content>\n" + 
		"  </entry>\n" + 
		"  <entry>\n" + 
		"    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(14)</id>\n" + 
		"    <title type=\"text\"></title>\n" + 
		"    <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"    <author>\n" + 
		"      <name />\n" + 
		"    </author>\n" + 
		"    <link rel=\"edit\" title=\"Product\" href=\"Products(14)\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category\" type=\"application/atom+xml;type=entry\" title=\"Category\" href=\"Products(14)/Category\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details\" type=\"application/atom+xml;type=feed\" title=\"Order_Details\" href=\"Products(14)/Order_Details\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier\" type=\"application/atom+xml;type=entry\" title=\"Supplier\" href=\"Products(14)/Supplier\" />\n" + 
		"    <category term=\"NorthwindModel.Product\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\n" + 
		"    <content type=\"application/xml\">\n" + 
		"      <m:properties>\n" + 
		"        <d:ProductID m:type=\"Edm.Int32\">14</d:ProductID>\n" + 
		"        <d:ProductName>Tofu</d:ProductName>\n" + 
		"        <d:SupplierID m:type=\"Edm.Int32\">6</d:SupplierID>\n" + 
		"        <d:CategoryID m:type=\"Edm.Int32\">7</d:CategoryID>\n" + 
		"        <d:QuantityPerUnit>40 - 100 g pkgs.</d:QuantityPerUnit>\n" + 
		"        <d:UnitPrice m:type=\"Edm.Decimal\">23.2500</d:UnitPrice>\n" + 
		"        <d:UnitsInStock m:type=\"Edm.Int16\">35</d:UnitsInStock>\n" + 
		"        <d:UnitsOnOrder m:type=\"Edm.Int16\">0</d:UnitsOnOrder>\n" + 
		"        <d:ReorderLevel m:type=\"Edm.Int16\">0</d:ReorderLevel>\n" + 
		"        <d:Discontinued m:type=\"Edm.Boolean\">false</d:Discontinued>\n" + 
		"      </m:properties>\n" + 
		"    </content>\n" + 
		"  </entry>\n" + 
		"  <entry>\n" + 
		"    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(28)</id>\n" + 
		"    <title type=\"text\"></title>\n" + 
		"    <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"    <author>\n" + 
		"      <name />\n" + 
		"    </author>\n" + 
		"    <link rel=\"edit\" title=\"Product\" href=\"Products(28)\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category\" type=\"application/atom+xml;type=entry\" title=\"Category\" href=\"Products(28)/Category\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details\" type=\"application/atom+xml;type=feed\" title=\"Order_Details\" href=\"Products(28)/Order_Details\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier\" type=\"application/atom+xml;type=entry\" title=\"Supplier\" href=\"Products(28)/Supplier\" />\n" + 
		"    <category term=\"NorthwindModel.Product\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\n" + 
		"    <content type=\"application/xml\">\n" + 
		"      <m:properties>\n" + 
		"        <d:ProductID m:type=\"Edm.Int32\">28</d:ProductID>\n" + 
		"        <d:ProductName>Rössle Sauerkraut</d:ProductName>\n" + 
		"        <d:SupplierID m:type=\"Edm.Int32\">12</d:SupplierID>\n" + 
		"        <d:CategoryID m:type=\"Edm.Int32\">7</d:CategoryID>\n" + 
		"        <d:QuantityPerUnit>25 - 825 g cans</d:QuantityPerUnit>\n" + 
		"        <d:UnitPrice m:type=\"Edm.Decimal\">45.6000</d:UnitPrice>\n" + 
		"        <d:UnitsInStock m:type=\"Edm.Int16\">26</d:UnitsInStock>\n" + 
		"        <d:UnitsOnOrder m:type=\"Edm.Int16\">0</d:UnitsOnOrder>\n" + 
		"        <d:ReorderLevel m:type=\"Edm.Int16\">0</d:ReorderLevel>\n" + 
		"        <d:Discontinued m:type=\"Edm.Boolean\">true</d:Discontinued>\n" + 
		"      </m:properties>\n" + 
		"    </content>\n" + 
		"  </entry>\n" + 
		"  <entry>\n" + 
		"    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(51)</id>\n" + 
		"    <title type=\"text\"></title>\n" + 
		"    <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"    <author>\n" + 
		"      <name />\n" + 
		"    </author>\n" + 
		"    <link rel=\"edit\" title=\"Product\" href=\"Products(51)\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category\" type=\"application/atom+xml;type=entry\" title=\"Category\" href=\"Products(51)/Category\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details\" type=\"application/atom+xml;type=feed\" title=\"Order_Details\" href=\"Products(51)/Order_Details\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier\" type=\"application/atom+xml;type=entry\" title=\"Supplier\" href=\"Products(51)/Supplier\" />\n" + 
		"    <category term=\"NorthwindModel.Product\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\n" + 
		"    <content type=\"application/xml\">\n" + 
		"      <m:properties>\n" + 
		"        <d:ProductID m:type=\"Edm.Int32\">51</d:ProductID>\n" + 
		"        <d:ProductName>Manjimup Dried Apples</d:ProductName>\n" + 
		"        <d:SupplierID m:type=\"Edm.Int32\">24</d:SupplierID>\n" + 
		"        <d:CategoryID m:type=\"Edm.Int32\">7</d:CategoryID>\n" + 
		"        <d:QuantityPerUnit>50 - 300 g pkgs.</d:QuantityPerUnit>\n" + 
		"        <d:UnitPrice m:type=\"Edm.Decimal\">53.0000</d:UnitPrice>\n" + 
		"        <d:UnitsInStock m:type=\"Edm.Int16\">20</d:UnitsInStock>\n" + 
		"        <d:UnitsOnOrder m:type=\"Edm.Int16\">0</d:UnitsOnOrder>\n" + 
		"        <d:ReorderLevel m:type=\"Edm.Int16\">10</d:ReorderLevel>\n" + 
		"        <d:Discontinued m:type=\"Edm.Boolean\">false</d:Discontinued>\n" + 
		"      </m:properties>\n" + 
		"    </content>\n" + 
		"  </entry>\n" + 
		"  <entry>\n" + 
		"    <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Products(74)</id>\n" + 
		"    <title type=\"text\"></title>\n" + 
		"    <updated>2013-04-29T12:02:17Z</updated>\n" + 
		"    <author>\n" + 
		"      <name />\n" + 
		"    </author>\n" + 
		"    <link rel=\"edit\" title=\"Product\" href=\"Products(74)\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Category\" type=\"application/atom+xml;type=entry\" title=\"Category\" href=\"Products(74)/Category\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Order_Details\" type=\"application/atom+xml;type=feed\" title=\"Order_Details\" href=\"Products(74)/Order_Details\" />\n" + 
		"    <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Supplier\" type=\"application/atom+xml;type=entry\" title=\"Supplier\" href=\"Products(74)/Supplier\" />\n" + 
		"    <category term=\"NorthwindModel.Product\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\n" + 
		"    <content type=\"application/xml\">\n" + 
		"      <m:properties>\n" + 
		"        <d:ProductID m:type=\"Edm.Int32\">74</d:ProductID>\n" + 
		"        <d:ProductName>Longlife Tofu</d:ProductName>\n" + 
		"        <d:SupplierID m:type=\"Edm.Int32\">4</d:SupplierID>\n" + 
		"        <d:CategoryID m:type=\"Edm.Int32\">7</d:CategoryID>\n" + 
		"        <d:QuantityPerUnit>5 kg pkg.</d:QuantityPerUnit>\n" + 
		"        <d:UnitPrice m:type=\"Edm.Decimal\">10.0000</d:UnitPrice>\n" + 
		"        <d:UnitsInStock m:type=\"Edm.Int16\">4</d:UnitsInStock>\n" + 
		"        <d:UnitsOnOrder m:type=\"Edm.Int16\">20</d:UnitsOnOrder>\n" + 
		"        <d:ReorderLevel m:type=\"Edm.Int16\">5</d:ReorderLevel>\n" + 
		"        <d:Discontinued m:type=\"Edm.Boolean\">false</d:Discontinued>\n" + 
		"      </m:properties>\n" + 
		"    </content>\n" + 
		"  </entry>\n" + 
		"</feed>"
		;
	
var sCategories2XML = "\
<?xml version=\"1.0\" encoding=\"iso-8859-1\" standalone=\"yes\"?>\
<entry xml:base=\"http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/\" xmlns:d=\"http://schemas.microsoft.com/ado/2007/08/dataservices\" xmlns:m=\"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata\" xmlns=\"http://www.w3.org/2005/Atom\">\
  <id>http://localhost:8080/uilib-sample/proxy/http/services.odata.org/Northwind/Northwind.svc/Categories(2)</id>\
  <title type=\"text\"></title>\
  <updated>2013-05-15T12:23:22Z</updated>\
  <author>\
    <name />\
  </author>\
  <link rel=\"edit\" title=\"Category\" href=\"Categories(2)\" />\
  <link rel=\"http://schemas.microsoft.com/ado/2007/08/dataservices/related/Products\" type=\"application/atom+xml;type=feed\" title=\"Products\" href=\"Categories(2)/Products\" />\
  <category term=\"NorthwindModel.Category\" scheme=\"http://schemas.microsoft.com/ado/2007/08/dataservices/scheme\" />\
  <content type=\"application/xml\">\
    <m:properties>\
      <d:CategoryID m:type=\"Edm.Int32\">2</d:CategoryID>\
      <d:CategoryName>Condiments</d:CategoryName>\
      <d:Description>Sweet and savory sauces, relishes, spreads, and seasonings</d:Description>\
    </m:properties>\
  </content>\
</entry>\
	";
