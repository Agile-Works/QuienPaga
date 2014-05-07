using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Caching;
using QuienPaga.Api.Manager.Massive;
using QuienPaga.Api.Model;

namespace QuienPaga.Api.Repos
{
    public class Repository : IRepository
    {
        public IList<DataModel> GetDataFromCache()
        {
            Cache cache = HttpRuntime.Cache;
            if (cache.Get("DataQuery") == null)
            {
                var data = new QPFormulas().All();
                var model = new List<DataModel>();
                foreach (var d in data)
                {
                    var detalle = new DataModel() { DETALLE = d.DETALLE, FECHA = d.FECHA, MONTO = d.MONTO, ORIGEN = d.ORIGEN, PARTIDA = d.PARTIDA, PARTIDO = d.PARTIDO, SECTOR = d.SECTOR };
                    model.Add(detalle);
                }
                cache.Add("DataQuery", model, null, DateTime.Now.AddSeconds(20), TimeSpan.Zero, CacheItemPriority.Normal, null);
                return model;
            }
            else
            {
                return (IList<DataModel>)cache.Get("DataQuery");
            }

        }
    }
}