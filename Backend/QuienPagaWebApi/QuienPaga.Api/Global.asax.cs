using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Caching;
using System.Web.Http;
using System.Web.Mvc;
using QuienPaga.Api.Manager.Massive;
using QuienPaga.Api.Model;
using QuienPaga.Api.Repos;
using StructureMap;


namespace QuienPaga.Api
{

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            ObjectFactory.Configure(x => x.For<IRepository>().Singleton().Use<Repository>());

            //Cache cache = HttpRuntime.Cache;
            //if (cache.Get("DataQuery") == null)
            //{
            //    var data = new QPFormulas().All();
            //    var model = new List<DataModel>();
            //    foreach (var d in data)
            //    {
            //        var detalle = new DataModel() { DETALLE = d.DETALLE, FECHA = d.FECHA, MONTO = d.MONTO, ORIGEN = d.ORIGEN, PARTIDA = d.PARTIDA, PARTIDO = d.PARTIDO, SECTOR = d.SECTOR };
            //        model.Add(detalle);
            //    }
            //    cache.Add("DataQuery", model, null, DateTime.Now.AddYears(100), TimeSpan.Zero, CacheItemPriority.Normal, null);
            //}

        }
    }


}