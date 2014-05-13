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

        public IEnumerable<dynamic> GetMainData()
        {
           return new QPFormulas().Query(@"SELECT Partido as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                                Group by PARTIDO"); 
        }

        public IEnumerable<dynamic> GetSectorbyPoliticalParty(string partido)
        {
            return new QPFormulas().Query(@"SELECT Sector as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                                Where Partido like @0
                                                Group by Sector",partido); 
        }

        public IEnumerable<dynamic> GetOriginbyPoliticalParty(string partido)
        {
            return new QPFormulas().Query(@"SELECT ORIGEN as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                                Where Partido like @0
                                                Group by ORIGEN", partido);
        }

        public IEnumerable<dynamic> GetDatabyPoliticalSector(string partido, string sector)
        {
            return new QPFormulas().Query(@"SELECT Detalle as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                                Where Partido like @0
                                                Group by Sector", partido); 
        }

        public IEnumerable<dynamic> GetDatabyDetail(string partido, string origen)
        {
            object[] parametros = { partido, origen };

            return new QPFormulas().Query(@"SELECT Top 10 DETALLE as 'Label', SUM(Monto) as 'Monto'
                                            FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                            WHERE partido=@0 and origen=@1
                                            GROUP BY DETALLE
                                            ORDER BY Monto desc ",parametros);
        }

        public IEnumerable<dynamic> GetDatabyContributor(string person)
        {
            return new QPFormulas().Query(@"SELECT PARTIDO as 'Label', SUM(Monto) as 'Monto'
                                            FROM [QuienPaga].[dbo].[QP_INGRESOS_FORMULAS]
                                            WHERE DETALLE = @0
                                            GROUP BY PARTIDO", person);
        }
    }
}