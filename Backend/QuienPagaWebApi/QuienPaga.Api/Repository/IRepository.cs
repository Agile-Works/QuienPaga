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
    }
}