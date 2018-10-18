param (
	[string]$resourceGroup,
	[string]$location,
	[string]$login,
	[string]$password,
	[string]$serverName,
	[string]$databaseName,
	[string]$ip,
	[string]$storageAccountName,
	[string]$tableName	
)

Import-Module AzureRM

Connect-AzureRmAccount

#Resource Group
New-AzureRmResourceGroup -Name $resourceGroup -Location $location


#Sql Server
New-AzureRmSqlServer -ResourceGroupName $resourceGroup -Location $location -ServerName $serverName -SqlAdministratorCredentials $(New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $login, $(ConvertTo-SecureString -String $password -AsPlainText -Force))

#Sql Server Firewall Rule
New-AzureRmSqlServerFirewallRule -ResourceGroupName $resourceGroup -ServerName $serverName -FirewallRuleName "AlloweMe" -StartIpAddress $ip -EndIpAddress $ip

#Sql Database
New-AzureRmSqlDatabase  -ResourceGroupName $resourceGroup -ServerName $serverName -DatabaseName $databaseName -Edition "Basic"


#Sql Storage
$storageAccount = New-AzureRmStorageAccount -ResourceGroupName $resourceGroup -Name $storageAccountName -Location $location -SkuName Standard_LRS -Kind StorageV2 -AccessTier Cool
$ctx = $storageAccount.Context

#Sql Sotrage Table - something not working here when running a whole script
New-AzureStorageTable -Context $ctx -Name $tableName


#Cosmos DB - MongoDB
$consistencyPolicy = @{"defaultConsistencyLevel"="Session"; "maxIntervalInSeconds"="5"; "maxStalenessPrefix"="100"}

$DBProperties = @{"databaseAccountOfferType"="Standard"; "consistencyPolicy"=$consistencyPolicy; "ipRangeFilter"=$ip}

New-AzureRmResource -ResourceType "Microsoft.DocumentDb/databaseAccounts" -ResourceGroupName $resourceGroup -Location $location -Name $serverName -Kind "MongoDB" -PropertyObject $DBProperties