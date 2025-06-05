import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddcategorieComponent } from './composant/categorie/addcategorie/addcategorie.component';
import { ListecategorieComponent } from './composant/categorie/listecategorie/listecategorie.component';
import { AddsoucategorieComponent } from './composant/souscategorie/addsoucategorie/addsoucategorie.component';
import { ListesouscategorieComponent } from './composant/souscategorie/listesouscategorie/listesouscategorie.component';
import { AddarticleComponent } from './composant/article/addarticle/addarticle.component';
import { ListearticleComponent } from './composant/article/listearticle/listearticle.component';
import { AddfournisseurComponent } from './composant/fournisseur/addfournisseur/addfournisseur.component';
import { ListefournisseurComponent } from './composant/fournisseur/listefournisseur/listefournisseur.component';
import { AddclientComponent } from './composant/client/addclient/addclient.component';
import { ListeclientComponent } from './composant/client/listeclient/listeclient.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {MaterialModule} from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { UpdateclientComponent } from './composant/client/updateclient/updateclient.component';
import { UpdatecategorieComponent } from './composant/categorie/updatecategorie/updatecategorie.component';
import { UpdatesouscategorieComponent } from './composant/souscategorie/updatesouscategorie/updatesouscategorie.component';
import { UpdatearticleComponent } from './composant/article/updatearticle/updatearticle.component';
import { DashboardComponent } from './composant/shared/dashboard/dashboard.component';
import { SidemenuComponent } from './composant/shared/sidemenu/sidemenu.component';
import { FooterComponent } from './composant/shared/footer/footer.component';
import { HeaderComponent } from './composant/shared/header/header.component';
import { AddcommandeComponent } from './composant/commande/addcommande/addcommande.component';
import { ListcommandeComponent } from './composant/commande/listcommande/listcommande.component';
import { UpdatecommandeComponent } from './composant/commande/updatecommande/updatecommande.component';
import { AddLcommandeComponent } from './composant/commande/add-lcommande/add-lcommande.component';
import { ListLcommandeComponent } from './composant/commande/list-lcommande/list-lcommande.component';
import { AddAgentComponent } from './composant/agent/add-agent/add-agent.component';
import { ListAgentComponent } from './composant/agent/list-agent/list-agent.component';
import { ListAvoirComponent } from './composant/avoir/list-avoir/list-avoir.component';
import { AddAvoirComponent } from './composant/avoir/add-avoir/add-avoir.component';
import { AddLavoirComponent } from './composant/avoir/add-lavoir/add-lavoir.component';
import { ListLavoirComponent } from './composant/avoir/list-lavoir/list-lavoir.component';

import { AddChariotComponent } from './composant/chariot/add-chariot/add-chariot.component';
import { ListChariotComponent } from './composant/chariot/list-chariot/list-chariot.component';
import { AddCommsComponent } from './composant/comms/add-comms/add-comms.component';
import { AddLcommsComponent } from './composant/comms/add-lcomms/add-lcomms.component';
import { ListLcommsComponent } from './composant/comms/list-lcomms/list-lcomms.component';
import { ListCommsComponent } from './composant/comms/list-comms/list-comms.component';
import { AddConsommationComponent } from './composant/consCarburant/add-consommation/add-consommation.component';
import { ListConsommationComponent } from './composant/consCarburant/list-consommation/list-consommation.component';
import { AddConssonedeComponent } from './composant/consSonede/add-conssonede/add-conssonede.component';
import { AddLconssonedeComponent } from './composant/consSonede/add-lconssonede/add-lconssonede.component';
import { ListLconssonedeComponent } from './composant/consSonede/list-lconssonede/list-lconssonede.component';
import { ListConssonedeComponent } from './composant/consSonede/list-conssonede/list-conssonede.component';
import { AddConsstegComponent } from './composant/consSteg/add-conssteg/add-conssteg.component';
import { AddLconsstegComponent } from './composant/consSteg/add-lconssteg/add-lconssteg.component';
import { ListLconsstegComponent } from './composant/consSteg/list-lconssteg/list-lconssteg.component';
import { ListConsstegComponent } from './composant/consSteg/list-conssteg/list-conssteg.component';
import { AddDevisComponent } from './composant/devis/add-devis/add-devis.component';
import { AddLdevisComponent } from './composant/devis/add-ldevis/add-ldevis.component';
import { ListLdevisComponent } from './composant/devis/list-ldevis/list-ldevis.component';
import { ListDevisComponent } from './composant/devis/list-devis/list-devis.component';
import { AddDirectionComponent } from './composant/direction/add-direction/add-direction.component';
import { ListDirectionComponent } from './composant/direction/list-direction/list-direction.component';
import { AddFactComponent } from './composant/fact/add-fact/add-fact.component';
import { AddLfactComponent } from './composant/fact/add-lfact/add-lfact.component';
import { ListLfactComponent } from './composant/fact/list-lfact/list-lfact.component';
import { ListFactComponent } from './composant/fact/list-fact/list-fact.component';
import { AddFcommComponent } from './composant/fcomm/add-fcomm/add-fcomm.component';
import { AddFlcommComponent } from './composant/fcomm/add-flcomm/add-flcomm.component';
import { ListFlcommComponent } from './composant/fcomm/list-flcomm/list-flcomm.component';
import { ListFcommComponent } from './composant/fcomm/list-fcomm/list-fcomm.component';
import { AddFfactComponent } from './composant/ffact/add-ffact/add-ffact.component';
import { ListFfactComponent } from './composant/ffact/list-ffact/list-ffact.component';
import { AddFlivrComponent } from './composant/flivr/add-flivr/add-flivr.component';
import { AddFllivrComponent } from './composant/flivr/add-fllivr/add-fllivr.component';
import { ListFllivrComponent } from './composant/flivr/list-fllivr/list-fllivr.component';
import { ListFlivrComponent } from './composant/flivr/list-flivr/list-flivr.component';
import { AddGradeComponent } from './composant/grade/add-grade/add-grade.component';
import { ListGradeComponent } from './composant/grade/list-grade/list-grade.component';
import { AddInventComponent } from './composant/invent/add-invent/add-invent.component';
import { ListInventComponent } from './composant/invent/list-invent/list-invent.component';
import { ListLinventComponent } from './composant/invent/list-linvent/list-linvent.component';
import { AddLinventComponent } from './composant/invent/add-linvent/add-linvent.component';
import { AddlivrComponent } from './composant/livr/addlivr/addlivr.component';
import { AddllivrComponent } from './composant/livr/addllivr/addllivr.component';
import { ListllivrComponent } from './composant/livr/listllivr/listllivr.component';
import { ListlivrComponent } from './composant/livr/listlivr/listlivr.component';
import { AddPanierComponent } from './composant/panier/add-panier/add-panier.component';
import { AddPreleveComponent } from './composant/prelevement/add-preleve/add-preleve.component';
import { AddLpreleveComponent } from './composant/prelevement/add-lpreleve/add-lpreleve.component';
import { ListLpreleveComponent } from './composant/prelevement/list-lpreleve/list-lpreleve.component';
import { ListPreleveComponent } from './composant/prelevement/list-preleve/list-preleve.component';
import { AddRecoufComponent } from './composant/recouf/add-recouf/add-recouf.component';
import { AddLrecoufComponent } from './composant/recouf/add-lrecouf/add-lrecouf.component';
import { ListLrecoufComponent } from './composant/recouf/list-lrecouf/list-lrecouf.component';
import { ListRecoufComponent } from './composant/recouf/list-recouf/list-recouf.component';
import { ListRecouvComponent } from './composant/recouv/list-recouv/list-recouv.component';
import { ListLrecouvComponent } from './composant/recouv/list-lrecouv/list-lrecouv.component';
import { AddLrecouvComponent } from './composant/recouv/add-lrecouv/add-lrecouv.component';
import { AddRecouvComponent } from './composant/recouv/add-recouv/add-recouv.component';
import { AddResidenceComponent } from './composant/residence/add-residence/add-residence.component';
import { ListResidenceComponent } from './composant/residence/list-residence/list-residence.component';
import { AddTypefComponent } from './composant/typefac/add-typef/add-typef.component';
import { ListTypefComponent } from './composant/typefac/list-typef/list-typef.component';
import { ListUserComponent } from './composant/user/list-user/list-user.component';
import { LoginComponent } from './composant/user/login/login.component';
import { RegisterComponent } from './composant/user/register/register.component';
import { AddUserComponent } from './composant/userPoste/add-user/add-user.component';
import { LoginpComponent } from './composant/userPoste/loginp/loginp.component';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddmagasinComponent } from './composant/magasin/addmagasin/addmagasin.component';
import { ListmagasinComponent } from './composant/magasin/listmagasin/listmagasin.component';
import { MenuComponent } from './composant/shared/menu/menu.component';
import { AddcommandemagComponent } from './composant/commandemag/addcommandemag/addcommandemag.component';
import { ListcommandemagComponent } from './composant/commandemag/listcommandemag/listcommandemag.component';
import { AddLcommandemagComponent } from './composant/commandemag/add-lcommandemag/add-lcommandemag.component';
import { ListLcommandemagComponent } from './composant/commandemag/list-lcommandemag/list-lcommandemag.component';
import { UpdatecommandemagComponent } from './composant/commandemag/updatecommandemag/updatecommandemag.component';
import { UpdateuserComponent } from './composant/user/updateuser/updateuser.component';
import { ListecommandeintervaleComponent } from './composant/commande/listecommandeintervale/listecommandeintervale.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AddbcommandeComponent } from './composant/bcommande/addbcommande/addbcommande.component';
import { AddbLcommandeComponent } from './composant/bcommande/addb-lcommande/addb-lcommande.component';
import { AddblistcommandeComponent } from './composant/bcommande/addblistcommande/addblistcommande.component';
import { AddblistLcommandeComponent } from './composant/bcommande/addblist-lcommande/addblist-lcommande.component';
import { UpdatebcommandeComponent } from './composant/bcommande/updatebcommande/updatebcommande.component';
import { ArticlestockComponent } from './composant/article/articlestock/articlestock.component';
import { ListeComponent } from './composant/commande/paiement/liste/liste.component';
import { UpdateComponent } from './composant/commande/paiement/update/update.component';
import { ListefsComponent } from './composant/commande/fs/listefs/listefs.component';
import { Addcommande1Component } from './composant/commande/addcommande1/addcommande1.component';
import { AddLcommandefComponent } from './composant/commande/add-lcommandef/add-lcommandef.component';
import { TauxComponent } from './composant/taux/taux.component';
import { UpdatetauxComponent } from './composant/taux/updatetaux/updatetaux.component';
import { AddcommandepretComponent } from './composant/commandepret/addcommandepret/addcommandepret.component';
import { ListcommandepretComponent } from './composant/commandepret/listcommandepret/listcommandepret.component';
import { AddLcommandepretComponent } from './composant/commandepret/add-lcommandepret/add-lcommandepret.component';
import { ListLcommandepretComponent } from './composant/commandepret/list-lcommandepret/list-lcommandepret.component';
import { FacturentrepriseComponent } from './composant/facturentreprise/facturentreprise.component';
import { SettingComponent } from './composant/setting/setting.component';
import { RapportvanteadminComponent } from './composant/rapportvanteadmin/rapportvanteadmin.component';
import { RapportproformatgeneralComponent } from './composant/rapportproformatgeneral/rapportproformatgeneral.component';
import { ArticlesuperadminComponent } from './composant/article/articlesuperadmin/articlesuperadmin.component';
import { BcommdepotComponent } from './composant/bcommande/bcommdepot/bcommdepot.component';
import { FacturenomComponent } from './composant/facturenom/facturenom.component';
import { SuperadmincommComponent } from './composant/commande/superadmincomm/superadmincomm.component';
import { DetailcomminterComponent } from './composant/commande/detailcomminter/detailcomminter.component';
import { ModifprigenarticleComponent } from './composant/article/modifprigenarticle/modifprigenarticle.component';
import { ListegenarticleComponent } from './composant/article/listegenarticle/listegenarticle.component';
import { DetailventeComponent } from './composant/commande/detailvente/detailvente.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AddcategorieComponent,
    ListecategorieComponent,
    AddsoucategorieComponent,
    ListesouscategorieComponent,
    AddarticleComponent,
    ListearticleComponent,
    AddfournisseurComponent,
    ListefournisseurComponent,
    AddclientComponent,
    ListeclientComponent,
    UpdateclientComponent,
    UpdatecategorieComponent,
    UpdatesouscategorieComponent,
    UpdatearticleComponent,
    DashboardComponent,
    SidemenuComponent,
    FooterComponent,
    HeaderComponent,
    AddcommandeComponent,
    ListcommandeComponent,
    UpdatecommandeComponent,
    AddLcommandeComponent,
    ListLcommandeComponent,
    AddAgentComponent,
    ListAgentComponent,
    ListAvoirComponent,
    AddAvoirComponent,
    AddLavoirComponent,
    ListLavoirComponent,
    AddChariotComponent,
    ListChariotComponent,
    AddCommsComponent,
    AddLcommsComponent,
    ListLcommsComponent,
    ListCommsComponent,
    AddConsommationComponent,
    ListConsommationComponent,
    AddConssonedeComponent,
    AddLconssonedeComponent,
    ListLconssonedeComponent,
    ListConssonedeComponent,
    AddConsstegComponent,
    AddLconsstegComponent,
    ListLconsstegComponent,
    ListConsstegComponent,
    AddDevisComponent,
    AddLdevisComponent,
    ListLdevisComponent,
    ListDevisComponent,
    AddDirectionComponent,
    ListDirectionComponent,
    AddFactComponent,
    AddLfactComponent,
    ListLfactComponent,
    ListFactComponent,
    AddFcommComponent,
    AddFlcommComponent,
    ListFlcommComponent,
    ListFcommComponent,
    AddFfactComponent,
    ListFfactComponent,
    AddFlivrComponent,
    AddFllivrComponent,
    ListFllivrComponent,
    ListFlivrComponent,
    AddGradeComponent,
    ListGradeComponent,
    AddInventComponent,
    ListInventComponent,
    ListLinventComponent,
    AddLinventComponent,
    AddlivrComponent,
    AddllivrComponent,
    ListllivrComponent,
    ListlivrComponent,
    AddPanierComponent,
    AddPreleveComponent,
    AddLpreleveComponent,
    ListLpreleveComponent,
    ListPreleveComponent,
    AddRecoufComponent,
    AddLrecoufComponent,
    ListLrecoufComponent,
    ListRecoufComponent,
    ListRecouvComponent,
    ListLrecouvComponent,
    AddLrecouvComponent,
    AddRecouvComponent,
    AddResidenceComponent,
    ListResidenceComponent,
    AddTypefComponent,
    ListTypefComponent,
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    AddUserComponent,
    LoginpComponent,
    AddmagasinComponent,
    ListmagasinComponent,
    MenuComponent,
    AddcommandemagComponent,
    ListcommandemagComponent,
    AddLcommandemagComponent,
    ListLcommandemagComponent,
    UpdatecommandemagComponent,
    UpdateuserComponent,
    ListecommandeintervaleComponent,
    AddbcommandeComponent,
    AddbLcommandeComponent,
    AddblistcommandeComponent,
    AddblistLcommandeComponent,
    UpdatebcommandeComponent,
    ArticlestockComponent,
    ListeComponent,
    UpdateComponent,
    ListefsComponent,
    Addcommande1Component,
    AddLcommandefComponent,
    TauxComponent,
    UpdatetauxComponent,
    AddcommandepretComponent,
    ListcommandepretComponent,
    AddLcommandepretComponent,
    ListLcommandepretComponent,
    FacturentrepriseComponent,
    SettingComponent,
    RapportvanteadminComponent,
    RapportproformatgeneralComponent,
    ArticlesuperadminComponent,
    BcommdepotComponent,
    FacturenomComponent,
    SuperadmincommComponent,
    DetailcomminterComponent,
    ModifprigenarticleComponent,
    ListegenarticleComponent,
    DetailventeComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FlexModule,
    FlexLayoutModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
    //DatePipeModule
  ],
  providers: [DatePipe,{ provide: MAT_DIALOG_DATA, useValue: {} ,},
    { provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
  entryComponents:[AddclientComponent,AddcategorieComponent,AddsoucategorieComponent,AddarticleComponent]
})
export class AppModule { }
