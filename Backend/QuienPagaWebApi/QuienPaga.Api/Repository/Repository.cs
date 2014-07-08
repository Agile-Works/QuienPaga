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
                                                FROM [QuienPaga].[dbo].[QP_Ingresos]
                                                Group by PARTIDO 
                                                Order by Partido asc"); 
        }

        public IEnumerable<dynamic> GetSectorbyPoliticalParty(string partido)
        {
            return new QPFormulas().Query(@"SELECT Sector as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_Ingresos]
                                                Where Partido like @0
                                                Group by Sector", partido); 
        }

        public IEnumerable<dynamic> GetOriginbyPoliticalParty(string partido)
        {
            return new QPFormulas().Query(@"SELECT ORIGEN as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_Ingresos]
                                                Where Partido like @0
                                                Group by ORIGEN", partido);
        }

        public IEnumerable<dynamic> GetDatabyPoliticalSector(string partido, string sector)
        {
            partido = partido.Replace("\"", "");
            sector = sector.Replace("\"", "");


            return new QPFormulas().Query(@"SELECT DONANTE as 'Label', SUM(Monto) as 'Monto'
                                                FROM [QuienPaga].[dbo].[QP_Ingresos]
                                                Where Partido like @0
                                                Group by Sector", partido); 
        }

        public IEnumerable<dynamic> GetDatabyDetail(string partido, string origen)
        {
            partido = partido.Replace("\"", "");
            origen = origen.Replace("\"", "");

            object[] parametros = { partido, origen };

            return new QPFormulas().Query(@"SELECT DONANTE as 'Label', SUM(Monto) as 'Monto'
                                            FROM [QuienPaga].[dbo].[QP_Ingresos]
                                            WHERE partido=@0 and origen=@1
                                            GROUP BY DONANTE
                                            ORDER BY Monto desc ", parametros);
        }

        public IEnumerable<dynamic> GetDatabyContributor(string person)
        {
            person= person.Replace("\"", "");
            return new QPFormulas().Query(@"SELECT PARTIDO as 'Label', SUM(Monto) as 'Monto'
                                            FROM [QuienPaga].[dbo].[QP_Ingresos]
                                            WHERE LOWER(DONANTE) = @0
                                            GROUP BY Donante, PARTIDO", person.ToLower());
        }

        public IEnumerable<dynamic> GetAllContributors()
        {
            return new QPFormulas().Query(@"SELECT Distinct([DONANTE])
                                FROM [QuienPaga].[dbo].[QP_Ingresos]");
            
        }

        public IEnumerable<dynamic> GetAll()
        {
            return new QPFormulas().Query(@"SELECT Partido, 
                                                   Sector,
                                                   Jurisdiccion,
                                                   Origen, 
                                                   Concepto,
                                                   Donante,
                                                   Monto
                                                   From [QuienPaga].[dbo].[QP_Ingresos]
                                                   Order by Partido, Sector");
        }
    }
}