import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeclientComponent } from './composant/client/listeclient/listeclient.component';
import { AddclientComponent } from './composant/client/addclient/addclient.component';
import { UpdateclientComponent } from './composant/client/updateclient/updateclient.component';
import { ListecategorieComponent } from './composant/categorie/listecategorie/listecategorie.component';
import { AddcategorieComponent } from './composant/categorie/addcategorie/addcategorie.component';
import { UpdatecategorieComponent } from './composant/categorie/updatecategorie/updatecategorie.component';
import { ListesouscategorieComponent } from './composant/souscategorie/listesouscategorie/listesouscategorie.component';
import { UpdatesouscategorieComponent } from './composant/souscategorie/updatesouscategorie/updatesouscategorie.component';
import { ListearticleComponent } from './composant/article/listearticle/listearticle.component';
import { AddarticleComponent } from './composant/article/addarticle/addarticle.component';
import { UpdatearticleComponent } from './composant/article/updatearticle/updatearticle.component';
import { AddcommandeComponent } from './composant/commande/addcommande/addcommande.component';
import { AddbcommandeComponent } from './composant/bcommande/addbcommande/addbcommande.component';
import { ListcommandeComponent } from './composant/commande/listcommande/listcommande.component';
import { AddlivrComponent } from './composant/livr/addlivr/addlivr.component';
import { ListlivrComponent } from './composant/livr/listlivr/listlivr.component';
import { ListmagasinComponent } from './composant/magasin/listmagasin/listmagasin.component';
import { RegisterComponent } from './composant/user/register/register.component';
import { LoginComponent } from './composant/user/login/login.component';
import{AuthGuardService} from './services/auth/auth-guard.service';
import { SidemenuComponent } from './composant/shared/sidemenu/sidemenu.component';
import { MenuComponent } from './composant/shared/menu/menu.component';
import { DashboardComponent } from './composant/shared/dashboard/dashboard.component';
import { AddcommandemagComponent } from './composant/commandemag/addcommandemag/addcommandemag.component';
import { ListcommandemagComponent } from './composant/commandemag/listcommandemag/listcommandemag.component';
import { ListUserComponent } from './composant/user/list-user/list-user.component';
import { UpdateuserComponent } from './composant/user/updateuser/updateuser.component';
import { ListecommandeintervaleComponent } from './composant/commande/listecommandeintervale/listecommandeintervale.component';
import { ArticlestockComponent } from './composant/article/articlestock/articlestock.component';
import { ListeComponent } from './composant/commande/paiement/liste/liste.component';
import { UpdateComponent } from './composant/commande/paiement/update/update.component';
import { ListefsComponent } from './composant/commande/fs/listefs/listefs.component';
import { Addcommande1Component } from './composant/commande/addcommande1/addcommande1.component';
import { TauxComponent } from './composant/taux/taux.component';
import { UpdatetauxComponent } from './composant/taux/updatetaux/updatetaux.component';
import { AddcommandepretComponent } from './composant/commandepret/addcommandepret/addcommandepret.component';
import { AddbLcommandeComponent } from './composant/bcommande/addb-lcommande/addb-lcommande.component';
import { AddblistcommandeComponent } from './composant/bcommande/addblistcommande/addblistcommande.component';
import { UpdatebcommandeComponent } from './composant/bcommande/updatebcommande/updatebcommande.component';
import { FacturentrepriseComponent } from './composant/facturentreprise/facturentreprise.component';
import { UpdatecommandemagComponent } from './composant/commandemag/updatecommandemag/updatecommandemag.component';
import { RapportvanteadminComponent } from './composant/rapportvanteadmin/rapportvanteadmin.component';
import { RapportproformatgeneralComponent } from './composant/rapportproformatgeneral/rapportproformatgeneral.component';
import { ArticlesuperadminComponent } from './composant/article/articlesuperadmin/articlesuperadmin.component';
import { BcommdepotComponent } from './composant/bcommande/bcommdepot/bcommdepot.component';
import { FacturenomComponent } from './composant/facturenom/facturenom.component';
import { UpdatecommandeComponent } from './composant/commande/updatecommande/updatecommande.component';
import { SuperadmincommComponent } from './composant/commande/superadmincomm/superadmincomm.component';
import { DetailcomminterComponent } from './composant/commande/detailcomminter/detailcomminter.component';
import { ModifprigenarticleComponent } from './composant/article/modifprigenarticle/modifprigenarticle.component';
import { ListegenarticleComponent } from './composant/article/listegenarticle/listegenarticle.component';

const routes: Routes = [
  {path: '', component:DashboardComponent,canActivate:[AuthGuardService],children:[

    {
      path:"listeclient",
      component:ListeclientComponent
    },
  
    {
      path:"listecategorie",
      component:ListecategorieComponent
    },
    {
      path:"listearticle",
      component:ListearticleComponent
    },
    {
      path:"articlestock",
      component:ArticlestockComponent
    },
    {
      path:"listesouscategorie",
      component:ListesouscategorieComponent
    },
    {
      path:"lcomm",
      component:ListcommandeComponent
    },
    
    {
      path:"commp",
      component:ListeComponent
    },
    {
      path:"fs",
      component:ListefsComponent
    },
    {
      path:"payerfacture",
      component:UpdateComponent
    },
    {
       path:"lcommi",
       component:ListecommandeintervaleComponent 
    }
    ,
    {
      path:"listearticlesupadm",
      component:ArticlesuperadminComponent
    }
    ,
    {
      path:"facnom",
      component:FacturenomComponent
    }
    ,
    {
      path:"depotbc",
      component:BcommdepotComponent
    }
    ,
    {
      path:"lcommag",
      component:ListcommandemagComponent
    },
    {
      path:"llivr",
      component:ListlivrComponent
    },
    {
      path:"rappopro",
      component:RapportproformatgeneralComponent
    },
    {
      path:"magasin",
      component:ListmagasinComponent
    },
    {
      path:"register",
      component:RegisterComponent
    },
    {
      path:"userlist",
      component:ListUserComponent
    },
    {
      path:"updateuser",
      component:UpdateuserComponent
    },
    
    {
      path:"updatecategorie",
      component:UpdatecategorieComponent
    },
    {
      path:"updatesouscategorie",
      component:UpdatesouscategorieComponent
    },
    {
      path:"updateclient",
      component:UpdateclientComponent
    },
    {
      path:"taux",
      component:TauxComponent
    },
    {
      path:"updatetaux",
      component:UpdatetauxComponent
    },
    {
      path:"updatearticle",
      component:UpdatearticleComponent
    }
    ,
    {
      path:"commande",
      component:AddcommandeComponent
    }
    ,
    {
      path:"commande1",
      component:Addcommande1Component
    }
    ,
    {
      path:"bcommande",
      component:AddbcommandeComponent 
    },
    {
      path:"lbcommande",
      component:AddblistcommandeComponent
    }
    ,
    {
      path:"rappaorventegen",
      component:RapportvanteadminComponent
    }
    ,
    {
      path:"updatebcommande",
      component:UpdatebcommandeComponent 
    }
    ,
    {
      path:"updatecommande",
      component:UpdatecommandeComponent 
    }
    ,
    {
      path:"updatecommandemag",
      component:UpdatecommandemagComponent 
    }
    ,
    {
      path:"factentreprise",
      component:FacturentrepriseComponent
    }
    ,
    {
      path:"commandemag",
      component:AddcommandemagComponent
    }
    ,
    {
      path:"commandepret",
      component:AddcommandepretComponent
    } 
    ,
    {
      path:"livraison",
      component:AddlivrComponent
    },
    {
      path:"suppfact",
      component:SuperadmincommComponent   
    },
    {
      path:"detailcomm", 
      component:DetailcomminterComponent   
    },
    {
      path:"prixmodgen", 
      component:ModifprigenarticleComponent   
    },
    {
      path:"prixmodgen1", 
      component:ListegenarticleComponent   
    }
  ]},
  {
    path:"login",
    component:LoginComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
