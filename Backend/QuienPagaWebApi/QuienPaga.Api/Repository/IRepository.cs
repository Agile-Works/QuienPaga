using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QuienPaga.Api.Model;

namespace QuienPaga.Api.Repos
{
    public interface IRepository
    {
        IList<DataModel> GetDataFromCache();
        IEnumerable<dynamic> GetMainData();
        IEnumerable<dynamic> GetSectorbyPoliticalParty(string partido);
        IEnumerable<dynamic> GetOriginbyPoliticalParty(string partido);
        IEnumerable<dynamic> GetDatabyPoliticalSector(string partido, string sector);
        IEnumerable<dynamic> GetDatabyDetail(string partido, string origen);
        IEnumerable<dynamic> GetDatabyContributor(string person);
        IEnumerable<dynamic> GetAllContributors();
    }
}