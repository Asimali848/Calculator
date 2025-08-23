import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";


type PostData = {
  State: string;
  PostJudgmentInterestRate: string;
  Cite: string;
  Link?: string | null;
  Compounding?: string | null;
};

const data: PostData[] = [
  {
    State: "Alabama",
    PostJudgmentInterestRate: "7.5% (unless contract provides otherwise)",
    Cite: "Ala. Code $ 8-8-10",
    Link: null,
    Compounding: null,
  },
  {
    State: "Alaska",
    PostJudgmentInterestRate: "3% higher than the 12th Federal Reserve District discount rate in effect on January 2 of the year the judgment is entered unless contract provides otherwise.",
    Cite: "Alaska Stat. Ann. $09.30.070",
    Link: "https://public.courts.alaska.gov/web/forms/docs/adm-505.pdf",
    Compounding: null,
  },
  {
    State: "Arizona",
    PostJudgmentInterestRate: "The lesser of 10% or 1% plus the prime rate as published by the Board of Governors of the Federal Reserve System, unless otherwise specified by contract. On any judgment on medical debt, the lesser of the annual rate equal to the weekly average one-year constant maturity treasury yield, as published by the board of governors of the federal reserve system, for the calendar week preceding the date when the consumer was first provided with a bill or 3%.",
    Cite: "A.R.S. $ 44-1201",
    Link: "https://www.federalreserve.gov/releases/h15/",
    Compounding: null,
  },
  {
    State: "Arkansas",
    PostJudgmentInterestRate: "On contracts, the greater of the contract rate or 2% plus the Federal Reserve primary credit rate in effect on the date judgment is entered. All others, 2% plus the Federal Reserve primary credit rate in effect on the date judgment is entered.",
    Cite: "Ark. Code Ann. $ 16-65-114",
    Link: "https://fred.stlouisfed.org/series/PCREDIT8",
    Compounding: null,
  },
  {
    State: "California",
    PostJudgmentInterestRate: "10%. Or, 5% in cases of medical expenses or personal debt entered, or where the judgment is renewed, after January 1, 2023.",
    Cite: "Cal. Code Civ. Proc. $ 685.010",
    Link: null,
    Compounding: null,
  },
  {
    State: "Colorado",
    PostJudgmentInterestRate: "8% unless contract provides otherwise.",
    Cite: "Colo. Rev. Stat. Ann. $ 5-12-102",
    Link: null,
    Compounding: "Annually",
  },
  {
    State: "Connecticut",
    PostJudgmentInterestRate: "0.1",
    Cite: "Conn. Gen. Stat. Ann. $ 37-3a",
    Link: null,
    Compounding: null,
  },
  {
    State: "Delaware",
    PostJudgmentInterestRate: "Contract actions: the lesser of 5% plus the Federal Reserve Discount Rate or the contractual rate. All others: 5% plus the Federal Reserve discount rate, if the plaintiff had extended to defendant a written settlement demand valid for a minimum of 30 days in an amount less than the amount of damages on which the judgment was entered.",
    Cite: "6 Del. C. $ 2301",
    Link: "https://www.frbdiscountwindow.org/pages/discount-rates/current-discount-rates",
    Compounding: null,
  },
  {
    State: "District of Columbia",
    PostJudgmentInterestRate: "70% of the rate of interest set by the Secretary of the Treasury under 26 U.S.C. $6621 for underpayments of tax to the Internal Revenue Service, rounded to the nearest full percent, or if exactly 1/2 of 1%, increased to the next highest full percent, unless otherwise specified by contract.",
    Cite: "D.C. Code $ 28-3302",
    Link: "https://www.dol.gov/agencies/ebsa/employers-and-advisers/plan-administration-and-compliance/correction-programs/vfcp/table-of-underpayment-rates",
    Compounding: null,
  },
  {
    State: "Federal (USA)",
    PostJudgmentInterestRate: "The weekly average one-year constant maturity Treasury yield, as published by the Board of Governors of the Federal Reserve System, for the calendar week preceding the date of the judgment.",
    Cite: "28 U.S.C. $ 1961",
    Link: "https://fred.stlouisfed.org/series/WGS1YR",
    Compounding: "Annually",
  },
  {
    State: "Florida",
    PostJudgmentInterestRate: "400 basis points plus the averaged discount rate of the Federal Reserve Bank of New York for the preceding 12 months, adjusted quarterly. The interest rate due on a judgment is adjusted every year after the judgment is entered on January 1.",
    Cite: "Fla. Stat. $ 55.03",
    Link: "https://myfloridacfo.com/division/aa/audits-reports/judgment-interest-rates",
    Compounding: null,
  },
  {
    State: "Georgia",
    PostJudgmentInterestRate: "3% plus the prime rate as published by the Board of Governors of the Federal Reserve System, unless otherwise specified by contract.",
    Cite: "O.C.G.A. $ 7-4-12",
    Link: "https://www.federalreserve.gov/releases/h15/",
    Compounding: null,
  },
  {
    State: "Hawaii",
    PostJudgmentInterestRate: "0.1",
    Cite: "HRS $ 478-3",
    Link: null,
    Compounding: null,
  },
  {
    State: "Idaho",
    PostJudgmentInterestRate: "5% plus the base rate in effect at the time of entry of the judgment. The base rate is determined on July 1 of each year by the Idaho state treasurer and is equal to the weekly average yield on US Treasury securities as adjusted to a constant maturity of one year and rounded up to the nearest one-eighth percent.",
    Cite: "Idaho Code $ 28-22-104",
    Link: "https://sto.idaho.gov/Banking/Legal-Rate-of-Interest",
    Compounding: null,
  },
  {
    State: "Illinois",
    PostJudgmentInterestRate: "9%. However, 5% if the action is on a consumer debt less than $25,000. Exceptions apply in personal injury/wrongful death actions - check the statutes.",
    Cite: "735 ILCS 5/2-1303",
    Link: null,
    Compounding: null,
  },
  {
    State: "Indiana",
    PostJudgmentInterestRate: "8% or the rate specified in the contract not to exceed 8%.",
    Cite: "Ind. Code $ 24-4.6-1-101",
    Link: null,
    Compounding: null,
  },
  {
    State: "Iowa",
    PostJudgmentInterestRate: "2% plus the one-year treasury constant maturity published by the Federal Reserve in the H15 report settled immediately before the date of the judgment, unless otherwise specified by contract.",
    Cite: "Iowa Code Ann. $$ 535.3, 668.13",
    Link: "https://www.federalreserve.gov/releases/h15/",
    Compounding: null,
  },
  {
    State: "Kansas",
    PostJudgmentInterestRate: "4% plus the New York Federal Reserve discount rate as of July 1 preceding the date the judgment was rendered, unless otherwise specified by contract.",
    Cite: "K.S.A. $$ 16-204, 16-205",
    Link: "https://www.frbdiscountwindow.org/pages/discount-rates/current-discount-rates",
    Compounding: null,
  },
  {
    State: "Kentucky",
    PostJudgmentInterestRate: "6%, unless otherwise specified by contract. A court entering a judgment on a claim for unliquidated damages has the discretion to lower the interest rate owed on the judgment to below 6% after a hearing.",
    Cite: "KRS 360.040",
    Link: null,
    Compounding: "Annually",
  },
  {
    State: "Louisiana",
    PostJudgmentInterestRate: "3.25% plus the Federal Reserve Board of Governors discount rate.",
    Cite: "LA R.S. $ 13:4202",
    Link: "https://www.frbdiscountwindow.org/pages/discount-rates/current-discount-rates",
    Compounding: null,
  },
  {
    State: "Maine",
    PostJudgmentInterestRate: "6% plus the one-year US Treasury bill rate. In actions on a contract, the greater of the contractual rate or the statutory rate.",
    Cite: "14 M.R.S.A. $ 1602-C",
    Link: "https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics?data=billrates%20",
    Compounding: null,
  },
  {
    State: "Maryland",
    PostJudgmentInterestRate: "10% unless contract provides otherwise.",
    Cite: "Md. Code Ann., Cts. & Jud. Proc. $$ 11-106, 11-107",
    Link: null,
    Compounding: null,
  },
  {
    State: "Massachusetts",
    PostJudgmentInterestRate: "12% unless contract provides otherwise. (Exceptions apply, consult statute).",
    Cite: "M.G.L. c. 231, $$ 6B, 6C, 6H c. 235, $ 8",
    Link: null,
    Compounding: null,
  },
  {
    State: "Michigan",
    PostJudgmentInterestRate: "In actions on a contract, the contractual rate, not to exceed 13%. In all other actions, 1% plus the average interest rate paid at auctions of five-year US Treasury notes during the six months immediately preceding July 1 and January 1, as certified by the state treasurer and compounded annually.",
    Cite: "MCL 600.6013",
    Link: "https://www.michigan.gov/taxes/interest-rates-for-money-judgments",
    Compounding: "Rates Change on January 1 and July 1. Interest compounds annually.",
  },
  {
    State: "Minnesota",
    PostJudgmentInterestRate: "On judgments of less than $50,000, a rate determined by the state court administrator and published on the state revisor's website, unless otherwise specified by contract. On judgments greater than $50,000, 10%, unless the contract provides otherwise.",
    Cite: "Minn. Stat. Ann. $ 549.09",
    Link: "https://www.revisor.mn.gov/court_rules/rule/msinte/",
    Compounding: null,
  },
  {
    State: "Mississippi",
    PostJudgmentInterestRate: "In actions on a contract, the contractual rate or 8% if the contract is silent. In all other actions, as set by the judge hearing the action.",
    Cite: "Miss. Code Ann. $$ 75-17-1, 75-17-7",
    Link: null,
    Compounding: null,
  },
  {
    State: "Missouri",
    PostJudgmentInterestRate: "Non-Tort Actions: The greater of 9% or the contractual rate. Tort actions: 5% plus the Federal Funds Rate established by the Federal Reserve Board.",
    Cite: "RSMo $ 408.040",
    Link: "https://www.newyorkfed.org/markets/reference-rates/effr",
    Compounding: null,
  },
  {
    State: "Montana",
    PostJudgmentInterestRate: "3% plus the rate for bank prime loans published by the Federal Reserve System, unless otherwise specified by contract.",
    Cite: "Mont. Code Ann. $ 25-9-205",
    Link: "https://fred.stlouisfed.org/release/tables?rid=18&eid=291%20",
    Compounding: null,
  },
  {
    State: "Nebraska",
    PostJudgmentInterestRate: "2% plus the bond investment yield, as published by the US Treasury Secretary, of the average accepted auction price for the first auction of each annual quarter of the 26-week US Treasury bills in effect on the date of entry of the judgment, unless otherwise specified by contract.",
    Cite: "Neb. Rev. St. $ 45-103",
    Link: "https://nebraskajudicial.gov/rules/administrative-policies-schedules/judgment-interest-rate",
    Compounding: null,
  },
  {
    State: "Nevada",
    PostJudgmentInterestRate: "2% plus the prime rate at the largest bank in Nevada, unless the contract provides otherwise.",
    Cite: "NRS 17.130",
    Link: "https://fred.stlouisfed.org/release/tables?rid=18&eid=291%20",
    Compounding: null,
  },
  {
    State: "New Hampshire",
    PostJudgmentInterestRate: "2% plus the prevailing discount rate of interest on 26-week US Treasury bills at the last auction of bills preceding the last day of September in each year",
    Cite: "N.H. RSA $ 336:1",
    Link: "https://fred.stlouisfed.org/release/tables?rid=18&eid=291%20",
    Compounding: null,
  },
  {
    State: "New Jersey",
    PostJudgmentInterestRate: "For judgments not exceeding the monetary limit of the Special Civil Part at the time of entry, the average rate of return, to the nearest whole or one half percent, for the corresponding preceding fiscal year terminating on June 30, of the State of New Jersey Cash Management Fund as reported by the Division of Investment in the Department of the Treasury. For judgments exceeding the monetary limit of the Special Civil Part at the time of entry, the lower rate plus 2%.",
    Cite: "N.J. R. 4:42-11",
    Link: "https://www.njcourts.gov/faq/what-are-pre-judgment-and-post-judgment-interest-rates",
    Compounding: null,
  },
  {
    State: "New Mexico",
    PostJudgmentInterestRate: "Non-Tort Cases: 8.75%, unless the contact provides otherwise. Tort Cases: 15%.",
    Cite: "NMSA 1978, $ 56-8-4",
    Link: null,
    Compounding: null,
  },
  {
    State: "New York",
    PostJudgmentInterestRate: "Consumer Debt: 2% All Other  Actions: 9%, In all other actions, 9%, unless statute provides otherwise.",
    Cite: "CPLR $ 5004",
    Link: null,
    Compounding: null,
  },
  {
    State: "North Carolina",
    PostJudgmentInterestRate: "Contract Actions: the contract rate or 8% if the contract is silent. All Others: 8%",
    Cite: "N.C.G.S. $$ 24-1, 24-5",
    Link: null,
    Compounding: null,
  },
  {
    State: "North Dakota",
    PostJudgmentInterestRate: "3% plus the prime rate published in the Wall Street Journal on the first Monday in December of each year plus three percentage points rounded up to the next one-half percentage point, unless the contract provides otherwise.",
    Cite: "N.D.C.C. $ 28-20-34",
    Link: "https://www.ndcourts.gov/state-court-administration/interest-rate-on-judgments",
    Compounding: null,
  },
  {
    State: "Ohio",
    PostJudgmentInterestRate: "3% plus the federal short-term rate, defined as \"the rate of the average market yield on outstanding marketable obligations of the US with remaining periods to maturity of three years or less, as  determined under section 1274 of the \"Internal Revenue Code of 1986\", unless the contract provides otherwise.",
    Cite: "Ohio R.C. 1343.03, 5703.47",
    Link: "https://www.courtclerk.org/judgment-interest-rates/",
    Compounding: null,
  },
  {
    State: "Oklahoma",
    PostJudgmentInterestRate: "2% plus the prime rate, as listed in the first edition of the Wall Street Journal published for each calendar year, unless the contract provides otherwise.",
    Cite: "Okla. Stat. tit. 12, $ 727.1",
    Link: "https://www.oscn.net/applications/oscn/index.asp?ftdb=STOKIN&level=1",
    Compounding: "Rates change on January 1. Prior year's interest is compounded on January 1.",
  },
  {
    State: "Oregon",
    PostJudgmentInterestRate: "9% unless the contract provides a higher rate.",
    Cite: "Or. Rev. Stat. $ 82.010",
    Link: null,
    Compounding: null,
  },
  {
    State: "Pennsylvania",
    PostJudgmentInterestRate: "0.06",
    Cite: "41 P.S. $ 202; 42 Pa. C.S.A. $ 8101",
    Link: null,
    Compounding: null,
  },
  {
    State: "Puerto Rico",
    PostJudgmentInterestRate: "The rate fixed by regulation by the Finance Board of the Office of the Commissioner of Financial Institutions in effect when judgment is rendered.",
    Cite: "P.R. Laws Ann. tit 32, Appendix V, $ 44.3",
    Link: "https://docs.pr.gov/files/OCIF/INTERES-APLICABLE/Tabla%20Intereses%20Aplicables%20a%20Sentencias-1985%20hasta%20junio%202025.pdf",
    Compounding: null,
  },
  {
    State: "Rhode Island",
    PostJudgmentInterestRate: "12% unless the contract provides otherwise.",
    Cite: "R.I. Gen. Laws $ 9-21-10",
    Link: null,
    Compounding: null,
  },
  {
    State: "South Carolina",
    PostJudgmentInterestRate: "4% plus the prime rate as listed in the first edition of the Wall Street Journal published for each calendar year for which the damages are awarded.",
    Cite: "S.C. Code Ann. $ 34-31-20",
    Link: "https://www.sccourts.org/opinions-orders/court-orders/administrative/",
    Compounding: "Annually",
  },
  {
    State: "South Dakota",
    PostJudgmentInterestRate: "0.1",
    Cite: "SDCL 54-3-5.1, 54-3-16",
    Link: null,
    Compounding: null,
  },
  {
    State: "Tennessee",
    PostJudgmentInterestRate: "Contract Actions: Rate provided in the contract. All other actions: If judgment is entered between January 1 and June 30, 2% less than the formula rate per annum published by the commissioner of financial institutions on the state's website for December of the prior year. If judgment is entered between July 1 and December 31, 2% less than the formula rate per annum published by the commissioner of financial institutions on the state's website for June of the same year.",
    Cite: "T.C.A. $ 47-14-121",
    Link: "https://www.tn.gov/content/tn/tdfi/tdfi-how-do-i/info/formula-rate/formula-rate-history.html",
    Compounding: null,
  },
  {
    State: "Texas",
    PostJudgmentInterestRate: "Contract Actions: Lesser of the contract rate or 18%. All other actions: prime rate as published by the Board of Governors of the Federal Reserve System. If the prime rate is below 5%, then 5%. If the prime rate is more than 15%, then 15%.",
    Cite: "Tex. Fin. Code Ann. $ 304.002, $304.003, $304.006",
    Link: "https://www.fedprimerate.com/wall_street_journal_prime_rate_history.htm",
    Compounding: "Annually",
  },
  {
    State: "Utah",
    PostJudgmentInterestRate: "The federal post-judgment interest rate established by 28 U.S.C. $1961, unless otherwise provided by contract.",
    Cite: "Utah Code $ 15-1-4",
    Link: "https://www.utcourts.gov/en/court-records-publications/resources/interest-rates/historic.html",
    Compounding: null,
  },
  {
    State: "Vermont",
    PostJudgmentInterestRate: "0.12",
    Cite: "12 V.S.A. $ 2903",
    Link: null,
    Compounding: null,
  },
  {
    State: "Virginia",
    PostJudgmentInterestRate: "Contract Actions: Greater of 6% or the contract rate. All other actions: 6%.",
    Cite: "Va. Code Ann. $ 6.2-302",
    Link: null,
    Compounding: null,
  },
  {
    State: "Washington",
    PostJudgmentInterestRate: "Contract Actions: The contract rate. Tort Actions: 2% plus the prime rate, as published by the Board of Governors of the Federal Reserve System on the first business day of the calendar month immediately preceding the date of entry of the judgment.",
    Cite: "RCW 4.56.110",
    Link: "https://www.federalreserve.gov/releases/h15/",
    Compounding: null,
  },
  {
    State: "West Virginia",
    PostJudgmentInterestRate: "2% plus the Fifth Federal Reserve District (Richmond) secondary discount rate in effect on January 2 of the year in which the judgment or decree is entered, but not less than 4% or greater than 9%.",
    Cite: "W. Va. Code $ 56-6-31",
    Link: "https://www.courtswv.gov/search?search=post+judgment",
    Compounding: null,
  },
  {
    State: "Wisconsin",
    PostJudgmentInterestRate: "1% plus the prime rate as reported by the Federal Reserve Board in effect on January 1 of the year in which the judgment is entered if the judgment is entered on or before June 30 of that year or in effect on July 1 of the year in which the judgment is entered if the judgment is entered after June 30 of that year.",
    Cite: "Wis. Stat. $ 814.04",
    Link: "https://www.federalreserve.gov/releases/h15/",
    Compounding: null,
  },
  {
    State: "Wyoming",
    PostJudgmentInterestRate: "10%, unless the contract provides otherwise.",
    Cite: "Wyo. Stat. Ann. $ 1-16-102",
    Link: null,
    Compounding: null,
  },
];
const columns: ColumnDef<PostData>[] = [
  {
    accessorKey: "State",
    header: "State",
  },
  {
    accessorKey: "PostJudgmentInterestRate",  
    header: "Post-Judgment Interest Rate",
  },
  {
    accessorKey: "Cite",
    header: "Cite",
  },
  {
    accessorKey: "Link",
    header: "Link",
    cell: ({ row }) => {
      const link = row.original.Link;
      return link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Link here
        </a>
      ) : (
        <span className="text-gray-400">N/A</span>
      );
    },
  },
  {
    accessorKey: "Compounding",
    header: "Compounding",
  },
];

function DataTable({ columns, data }: { columns: ColumnDef<PostData>[]; data: PostData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-full overflow-x-auto rounded-2xl shadow-md">
      <CardContent className="p-4">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-sm font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const InterestRate = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full ">
        <h1 className="mb-4 text-2xl font-bold">Post-Judgment Interest Rates</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}

export default InterestRate
