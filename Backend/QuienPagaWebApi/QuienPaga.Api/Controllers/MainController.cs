
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Results;
using QuienPaga.Api.Repos;
using StructureMap;

namespace QuienPaga.Api.Controllers
{
    public class MainController : ApiController
    {
        private IRepository _repo= ObjectFactory.GetInstance<IRepository>();

        [HttpGet]
        public JsonResult<List<dynamic>> Index()
        {
            
            var data = _repo.GetDataFromCache();
            var model = new List<dynamic>();
            foreach (var partido in data.GroupBy(x => x.PARTIDO))
            {
                model.Add(new {Partido=partido.First().PARTIDO, Monto=partido.Select(x => x.MONTO).Sum()});
            }
            return Json(model);
          
        }

        
        [HttpGet]
        public JsonResult<List<dynamic>> RenderBySector(string partido)
        {

            var data = _repo.GetDataFromCache();
            var model = new List<dynamic>();

            foreach (var sector in data.Where(x=> x.PARTIDO.ToLower()==partido.ToLower()).GroupBy(t=>t.SECTOR))
            {
                model.Add(new { Sector = sector.First().SECTOR, Monto = sector.Select(x => x.MONTO).Sum() });
            }
            return Json(model);
        }

        [HttpGet]
        public JsonResult<List<dynamic>> RenderByOrigen(string partido)
        {
            var data = _repo.GetDataFromCache();
            var model = new List<dynamic>();

            foreach (var origen in data.Where(x => x.PARTIDO.ToLower() == partido.ToLower()).GroupBy(t => t.ORIGEN))
            {
                model.Add(new { Origen = origen.First().ORIGEN, Monto = origen.Select(x => x.MONTO).Sum() });
            }
            return Json(model);

        }

        [HttpGet]
        public JsonResult<List<dynamic>> RenderByDetail(string partido, string origen)
        {
            var data = _repo.GetDataFromCache();
            var model = new List<dynamic>();

            foreach (var detalle in data.Where(x => x.PARTIDO.ToLower() == partido.ToLower()).GroupBy(t => t.DETALLE))
            {
                model.Add(new { Detalle = detalle.First().DETALLE, Monto = detalle.Select(x => x.MONTO).Sum() });
            }
            return Json(model);
           
        }


        [HttpGet]
        public JsonResult<List<dynamic>> RenderByPerson(string person)
        {
            var data = _repo.GetDataFromCache();
            var model = new List<dynamic>();

            foreach (var detalle in data.Where(x => x.DETALLE.ToLower() == person.ToLower()).GroupBy(t => t.PARTIDO))
            {
                model.Add(new { Detalle = detalle.First().PARTIDO, Monto = detalle.Select(x => x.MONTO).Sum() });
            }
            return Json(model);
        }

    }
}
