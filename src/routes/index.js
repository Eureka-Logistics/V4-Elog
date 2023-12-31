import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
const App = ({ match }) => {
  return (
    <div className="gx-main-content-wrapper">
      <Switch>
        <Route
          path={`${match.url}Dashboard`}
          component={asyncComponent(() => import("./Dashboard"))}
        />
        <Route
          path={`${match.url}akunting/usernew`}
          component={asyncComponent(() => import("./MasterData/SP List/Akunting/CreateUserBaru/TabComponent/index"))}
        />
        <Route
          path={`${match.url}dashboardop`}
          component={asyncComponent(() =>
            import("./Dashboard/DashboardOperasional/index")
          )}
        />
        <Route
          path={`${match.url}Home`}
          component={asyncComponent(() => import("./Dashboard/Home"))}
        />
        <Route
          path={`${match.url}masterdata/drivers`}
          component={asyncComponent(() => import("./MasterData/Driver"))}
        />
        <Route
          path={`${match.url}masterdata/vehicle`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/Vehicle/VehicleBaru")
          )}
        />

        <Route
          path={`${match.url}masterdata/monitoring`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring/DriverMap")
          )}
        />

        <Route
          path={`${match.url}masterdata/driver`}
          component={asyncComponent(() =>
            import("./MasterData/Driver/CobaTable")
          )}
        />
        <Route
          path={`${match.url}approvesplistall`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/SP List Approve All/index")
          )}
        />
        <Route
          path={`${match.url}akunting/splistakunting`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring SP List Akunting/SPListAkunting")
          )}
        />
        <Route
          path={`${match.url}akunting/ar/ar`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/ARListALL")
          )}
        />
        <Route
          path={`${match.url}akunting/ar/detailar/:no`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/DetailAR")
          )}
        />
        <Route
          path={`${match.url}akunting/ap/`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APListALL")
          )}
        />
        <Route
          path={`${match.url}mastercustomersss`}
          component={asyncComponent(() =>
            import("./CopyData/MasterCustomer/index")
          )}
        />
        <Route
          path={`${match.url}ReportCustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterCustomer/ReportCustomer")
          )}
        />
        <Route
          path={`${match.url}LoseSale`}
          component={asyncComponent(() =>
            import("./CopyData/MasterCustomer/LoseSale")
          )}
        />
        <Route
          path={`${match.url}MastersCustomersDetails/:id_customer`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/MasterCustomer/DetailMasterCustomer")
          )}
        />

        <Route
          path={`${match.url}mastercustomersssAdd`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/MasterCustomer/add")
          )}
        />
        <Route
          path={`${match.url}mastercustomerssDetail`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/MasterCustomer/detail")
          )}
        />
        <Route
          path={`${match.url}invoicecustomer`}
          component={asyncComponent(() =>
            import("./MasterData/MasterInvoice/index")
          )}
        />
        <Route
          path={`${match.url}invoicecustomerdetail/:invoiceAddressId`}
          component={asyncComponent(() =>
            import("./MasterData/MasterInvoice/detail")
          )}
        />
        <Route
          path={`${match.url}invoicecustomercreate`}
          component={asyncComponent(() =>
            import("./MasterData/MasterInvoice/CreateMasterInvoice")
          )}
        />

        <Route
          path={`${match.url}alamatcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/index")
          )}
        />
        <Route
          path={`${match.url}newalamat`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/create")
          )}
        />
        <Route
          path={`${match.url}masteralamatadd`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/add")
          )}
        />
        <Route
          path={`${match.url}NewMasterAlamatCustomers`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/add")
          )}
        />
        <Route
          path={`${match.url}dataDetailMasterAlamatCustomers/:id`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/DataNewCustomerAddress")
          )}
        />
        <Route
          path={`${match.url}detailcustomerAdress/:customerAddressId`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/GetCustomerAddress")
          )}
        />
        <Route
          path={`${match.url}editdetailmastercustomeralamat/:customerAddressId`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/EditDetailAlamat")
          )}
        />
        <Route
          path={`${match.url}editcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/edit")
          )}
        />
        <Route
          path={`${match.url}masterkecamatan`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKecamatan/index")
          )}
        />
        <Route
          path={`${match.url}masterkota`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKota/index")
          )}
        />
        <Route
          path={`${match.url}masterprovinsi`}
          component={asyncComponent(() =>
            import("./CopyData/MasterProvinsi/index")
          )}
        />
        <Route
          path={`${match.url}akunting/tambahdataap`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/TambahDataAP")
          )}
        />
        <Route
          path={`${match.url}akunting/apaddon`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APAddOn")
          )}
        />
        <Route
          path={`${match.url}akunting/editapplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/EditAPList")
          )}
        />
        <Route
          path={`${match.url}akunting/detailaplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/DetailAPList")
          )}
        />
        <Route
          path={`${match.url}mastermitraNewCreate`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Form/NewDataMasterMitra")
          )}
        />
        <Route
          path={`${match.url}mastermitraPIC/:mitraId`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Form/CreatedPIC")
          )}
        />
        <Route
          path={`${match.url}CreatemastermitraCabang/:idmitra`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/MasterCabang/CreateMitraCabang")
          )}
        />
        <Route
          path={`${match.url}EditmastermitraCabang/:idmitra`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/MasterCabang/DetailEditMitraCabang")
          )}
        />

        <Route
          path={`${match.url}mastermitraCabang/:mitraId`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/MasterCabang/GetMitraCabang")
          )}
        />
        <Route
          path={`${match.url}mastermitra`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Index")
          )}
        />
        <Route
          path={`${match.url}mastermitraadd`}
          component={asyncComponent(() => import("./CopyData/MasterMitra/add"))}
        />
        <Route
          path={`${match.url}mastermitradetaill`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/DetailMitra")
          )}
        />
        <Route
          path={`${match.url}mastermitradetaillnew`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Form/Databaru")
          )}
        />
        <Route
          path={`${match.url}masterdata/detailsplama/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/DetailSP/Index")
          )}
        />

        <Route
          path={`${match.url}masterdata/detailsp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/HalamanDetail")
          )}
        />

        <Route
          path={`${match.url}masterdata/splistdetailakunting/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring SP List Akunting/DetailsAkunting")
          )}
        />
        <Route
          path={`${match.url}printSPKListNih`}
          component={asyncComponent(() => import("./Print/PrintSP"))}
        />
        <Route
          path={`${match.url}PrintMasterMitra`}
          component={asyncComponent(() =>
            import("./Print/PrintMasterMitra/PrintMasterMitra")
          )}
        />
        <Route
          path={`${match.url}masterdata/splistlama`}
          component={asyncComponent(() => import("./MasterData/SP List/index"))}
        />
        <Route
          path={`${match.url}masterdata/newsplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/SPList")
          )}
        />
        <Route
          path={`${match.url}masterdata/splist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Splistlama")
          )}
        />
        <Route
          path={`${match.url}email/SM`}
          component={asyncComponent(() =>
            import("./CopyData/Email/sm")
          )}
        />
        <Route
          path={`${match.url}email/SP`}
          component={asyncComponent(() =>
            import("./CopyData/Email/sp")
          )}
        />
        <Route
          path={`${match.url}masterdata/marketing/splist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Splistlama")
          )}
        />
        <Route
          path={`${match.url}masterdata/marketing/cancelsplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/CancelSPListSales")
          )}
        />
        <Route
          path={`${match.url}masterdata/marketing/createsp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/createSPBaru/Index")
          )}
        />
        {/* <Route
          path={`${match.url}masterdata/marketing/createspbaru`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/createSPBaru/CreateBaru")
          )}
        /> */}

        <Route
          path={`${match.url}masterdata/driver`}
          component={asyncComponent(() =>
            import("./MasterData/Driver/CobaTable")
          )}
        />
        <Route
          path={`${match.url}akunting/splistakunting`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring SP List Akunting/SPListAkunting")
          )}
        />
        <Route
          path={`${match.url}akunting/ar/ar`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/ARListALL")
          )}
        />
        <Route
          path={`${match.url}akunting/ar/detailar/:no`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/DetailAR")
          )}
        />
        <Route
          path={`${match.url}akunting/ap/`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APListALL")
          )}
        />
        <Route
          path={`${match.url}masteralamat`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/index")
          )}
        />
        <Route
          path={`${match.url}CreatedMasterAlamat`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/NewMasterAlamatNew")
          )}
        />
        <Route
          path={`${match.url}masteralamatadd`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/add")
          )}
        />
        <Route
          path={`${match.url}detailcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/detail")
          )}
        />
        <Route
          path={`${match.url}editcustomer`}
          component={asyncComponent(() =>
            import("./CopyData/MasterAlamat/edit")
          )}
        />
        <Route
          path={`${match.url}masterkecamatan`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKecamatan/index")
          )}
        />
        <Route
          path={`${match.url}masterkota`}
          component={asyncComponent(() =>
            import("./CopyData/MasterKota/index")
          )}
        />
        <Route
          path={`${match.url}masterprovinsi`}
          component={asyncComponent(() =>
            import("./CopyData/MasterProvinsi/index")
          )}
        />
        <Route
          path={`${match.url}akunting/tambahdataap`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/TambahDataAP")
          )}
        />
        <Route
          path={`${match.url}akunting/apaddon`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/APAddOn")
          )}
        />
        <Route
          path={`${match.url}akunting/editapplist`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/APList/EditAPList")
          )}
        />
        <Route
          path={`${match.url}mastermitra`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Index")
          )}
        />
        <Route
          path={`${match.url}mastermitraadd`}
          component={asyncComponent(() => import("./CopyData/MasterMitra/add"))}
        />
        <Route
          path={`${match.url}mastermitradetaill`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/DetailMitra")
          )}
        />
        <Route
          path={`${match.url}mastermitradetaillnew`}
          component={asyncComponent(() =>
            import("./CopyData/MasterMitraOld/Form/Databaru")
          )}
        />

        <Route
          path={`${match.url}tarifmitra`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/index")
          )}
        />
        <Route
          path={`${match.url}tarifmitradetail`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/detail")
          )}
        />
        <Route
          path={`${match.url}tarifmitraeditdetail/:id_price`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/DetailTarifMitra")
          )}
        />
        <Route
          path={`${match.url}tarifmitracreate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifMitra/create")
          )}
        />
        <Route
          path={`${match.url}tarifmitraedit`}
          component={asyncComponent(() => import("./CopyData/TarifMitra/edit"))}
        />
        <Route
          path={`${match.url}tarif_eureka`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/index")
          )}
        />
        {/* <Route path="/tarif_eureka_edit_detail/:id_price"  component={asyncComponent(() =>
            import("./CopyData/TarifEureka/EditDetail")
          )} /> */}
        <Route
          path={`${match.url}tarif_eureka_edit_detail/:id_price`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/EditDetail")
          )}
        />
        <Route
          path={`${match.url}tarif_eureka_edit`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/edit")
          )}
        />
        <Route
          path={`${match.url}tarif_eurekacreate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifEureka/create")
          )}
        />
        <Route
          path={`${match.url}CariTarif`}
          component={asyncComponent(() =>
            import("./CopyData/Tarif")
          )}
        />
        <Route
          path={`${match.url}DataBUIndex`}
          component={asyncComponent(() => import("./MasterData/BU/BU/IndexBU"))}
        />
        <Route
          path={`${match.url}createdataBU`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BU/CreateBU")
          )}
        />
        <Route
          path={`${match.url}dataBisnisUnit/:id`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BU/EditDetailBU")
          )}
        />
        <Route
          path={`${match.url}DataBuEmployee`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployee/IndexEmployee")
          )}
        />
        <Route
          path={`${match.url}CreateDataEmployee`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployee/CreateBUEmployee")
          )}
        />
        <Route
          path={`${match.url}EditDetailEmployeeBU/:idEmploye`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployee/Detail")
          )}
        />
        <Route
          path={`${match.url}DataBuBrench`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUBrench/IndexBrench")
          )}
        />
        <Route
          path={`${match.url}CreatedDataBuBrench`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUBrench/CreateBuBrench")
          )}
        />
        <Route
          path={`${match.url}DetailBuBrench/:bubrenchId`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUBrench/EditDetailBrench")
          )}
        />
        <Route
          path={`${match.url}DataBuEmployeePosition`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployeePosition/Index")
          )}
        />
        <Route
          path={`${match.url}AddNewPositions/:`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployeePosition/Index")
          )}
        />

        <Route
          path={`${match.url}DataBuEmployeePositionEditDetail/:id`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployeePosition/EditDetailPosition")
          )}
        />
        <Route
          path={`${match.url}CreateBuEmployeePositionEditDetail`}
          component={asyncComponent(() =>
            import("./MasterData/BU/BUEmployeePosition/CreateEmployeePosition")
          )}
        />

        <Route
          path={`${match.url}pelanggantarif`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/index")
          )}
        />
        <Route
          path={`${match.url}NewTarifCustomer`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/NewTarifCustomer")
          )}
        />
        <Route
          path={`${match.url}pelanggantarifedit`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/edit")
          )}
        />
        <Route
          path={`${match.url}detailTarifPelanggan/:id_price`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/DetailTarifPelanggan")
          )}
        />
        <Route
          path={`${match.url}pelanggantarifcerate`}
          component={asyncComponent(() =>
            import("./CopyData/TarifPelanggan/create")
          )}
        />
        <Route
          path={`${match.url}dashboarddd`}
          component={asyncComponent(() => import("./CopyData/Dashboard/index"))}
        />
        <Route
          path={`${match.url}lostsalee`}
          component={asyncComponent(() => import("./CopyData/LoseSales/index"))}
        />
        <Route
          path={`${match.url}akunting/ar/edits/:no`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/EditARDetail")
          )}
        />
        <Route
          path={`${match.url}akunting/ar/reportpartners/reportpenerimaaninvoice`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/Payment/PenerimaanINV")
          )}
        />
        <Route
          path={`${match.url}createar`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/ARList/CreateAR/CreateAR")
          )}
        />
        <Route
          path={`${match.url}akunting/splistakuntingbaru`}
          component={asyncComponent(() =>
            import(
              "./MasterData/SP List/Splistlama"
            )
          )}
        />
        <Route
          path={`${match.url}akunting/detaildatacustomer`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/MonitoringDataCustomer/index")
          )}
        />

        <Route
          path={`${match.url}akunting/splistwaitingakunting`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/Akunting/index")
          )}
        />
        <Route
          path={`${match.url}masterdata/purchasing/driver`}
          component={asyncComponent(() =>
            import("./MasterData/Driver/DriverTableBaru")
          )}
        />
        <Route
          path={`${match.url}purchasing/solist`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/SO-List/index")
          )}
        />
        <Route
          path={`${match.url}masterdata/driverbaru`}
          component={asyncComponent(() =>
            import("./MasterData/Driver/DriverTableBaru")
          )}
        />
        <Route
          path={`${match.url}masterdata/purchasing/vehicle`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/Vehicle/VehicleBaru")
          )}
        />
        <Route
          path={`${match.url}masterdata/vehiclebaru`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/Vehicle/VehicleBaru")
          )}
        />
        <Route
          path={`${match.url}purchasing/mastermitra`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/MasterMitra/Index")
          )}
        />
        <Route
          path={`${match.url}purchasing/DetailMitra/:mitraId`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/MasterMitra/DetailMitra")
          )}
        />
        <Route
          path={`${match.url}purchasing/tambahmitra/`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/MasterMitra/TambahMitraBaru")
          )}
        />

        <Route
          path={`${match.url}masterdata/operasional/detailsp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/HalamanDetail")
          )}
        />
        <Route
          path={`${match.url}masterdata/purchasing/detailsp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/SP List/HalamanDetail")
          )}
        />
        <Route
          path={`${match.url}purchasing/newsplist`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/SP/index")
          )}
        />
        <Route
          path={`${match.url}masterdata/sjlist`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/SP/SJ")
          )}
        />
        <Route
          path={`${match.url}masterdata/detailsjlist/:id`}
          component={asyncComponent(() =>
            import("./MasterData/Purchasing/SP/DetailSJ/index")
          )}
        />

        {/* ROUTE MARKETING */}
        <Route
          path={`${match.url}masterdata/edit-sp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/EditSP")
          )}
        />
        <Route
          path={`${match.url}masterdata/edit-spNew/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/EditSPNew")
          )}
        />
        <Route
          path={`${match.url}masterdata/detail-sp/:idmp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/DetailSP")
          )}
        />
        <Route
          path={`${match.url}masterdata/createsp`}
          component={asyncComponent(() =>
            import("./MasterData/Marketing/Splist/createSPBaru/Index")
          )}
        />


        {/* INI RACE */}
        <Route
          path={`${match.url}race/splist`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/splist/index")
          )}
        />
        <Route
          path={`${match.url}race/detailsp/:idMp`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/splist/Detailsplist/DetailSpRace")
          )}
        />
        <Route
          path={`${match.url}race/alamatcustomer`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Alamat Customer/index")
            
          )}
        />
        <Route
          path={`${match.url}race/historyalamatcustomer`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Alamat Customer/History Alamat Customer/")
            
          )}
        />
        <Route
          path={`${match.url}race/alamatcustomerdetail/:id`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Alamat Customer/halamandetail/index")
            
          )}
        />
        <Route
          path={`${match.url}race/kendaraan`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Kendaraan List/index")
          )}
        />
        <Route
          path={`${match.url}race/driver`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Driver List/index")
          )}
        />
        <Route
          path={`${match.url}race/cabang/splistt`}
          component={asyncComponent(() =>
            import("./raceCabang/spListCabang")
          )}
        />
        <Route
          path={`${match.url}race/detailsplistrace/:sm`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/splist/Detailsplist/index")
          )}
        />
        <Route
          path={`${match.url}race/cod`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/Cash On Delivery/CashOnDelivery")
          )}
        />
        <Route
          path={`${match.url}erlangga`}
          component={asyncComponent(() =>
            import("../routes/Race/Erlangga/index")
          )}
        />
        <Route
          path={`${match.url}mapping`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/Map Pengiriman/index")
          )}
        />
        <Route
          path={`${match.url}race/uangjalan`}
          component={asyncComponent(() =>
            import("./Race/WebAdmin/Uang Jalan/index")
          )}
        />
        <Route
          path={`${match.url}ReportKirimanRace`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/ReportKiriman/ReportKiriman")
          )}
        />
        <Route
          path={`${match.url}listdriver`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/ListDriver/index")
          )}
        />
        <Route
          path={`${match.url}race/sjlist`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/SMList/index")
          )}
        />
        <Route
          path={`${match.url}race/vehicle`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/List Vehicle/index")
          )}
        />
        <Route
          path={`${match.url}race/cabang/dashboard`}
          component={asyncComponent(() =>
            import("./raceCabang/DashboardCabang")
          )}
        />

        <Route
          path={`${match.url}race/cabang/sjlistt`}
          component={asyncComponent(() =>
            import("./raceCabang/SjListCabang")
          )}
        />
        {/* <Route
          path={`${match.url}race/newsp`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/splist/CreateNewSPpRace")
          )}
        /> */}

        <Route
          path={`${match.url}testdnd`}
          component={asyncComponent(() =>
            import("../routes/Race/WebAdmin/Map Pengiriman/TestDND")
          )}
        />
        <Route
          path={`${match.url}monitoringSJ`}
          component={asyncComponent(() =>
            import("./MasterData/SJ/MonitoringSJ")
          )}
        />
        <Route
          path={`${match.url}monitoringReportKiriman`}
          component={asyncComponent(() =>
            import("./MasterData/Monitoring/ReportKiriman/index")
          )}
        />
        {/* Monitoring */}
        <Route
          path={`${match.url}monitoring/report-kiriman`}
          component={asyncComponent(() =>
            import("../routes/MasterData/Monitoring/ReportKiriman/index")
          )}
        />
        <Route
          path={`${match.url}monitoring/monitoring-unit`}
          component={asyncComponent(() =>
            import("../routes/MasterData/Monitoring/Monitoring Unit/index")
          )}
        />
        <Route
          path={`${match.url}admin/user/menu`}
          component={asyncComponent(() => import("./MasterData/SP List/Akunting/CreateUserBaru/TabComponent/index"))}
        />

      </Switch>
    </div>
  );
};

export default App;
