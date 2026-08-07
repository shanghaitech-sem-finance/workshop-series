export type ScheduleKind =
  | "registration"
  | "remarks"
  | "talk"
  | "break"
  | "meal"
  | "networking";

export type Discussant = {
  name: string;
  institution: string;
};

export type ScheduleItem = {
  time: string;
  kind: ScheduleKind;
  label: string;
  speaker?: string;
  institution?: string;
  title?: string;
  abstract?: string;
  discussant?: Discussant;
};

export type Workshop = {
  year: "2023" | "2024" | "2025";
  name: string;
  date: string;
  location: string;
  schedule: ScheduleItem[];
  sources: { label: string; href: string }[];
};

const workshop2025: Workshop = {
  year: "2025",
  name: "2025 SEM Finance Workshop: Household Finance",
  date: "Saturday, December 20, 2025",
  location:
    "Room 501, School of Entrepreneurship and Management, ShanghaiTech University, No. 1 Zhongke Road",
  schedule: [
    { time: "8:30-9:00", kind: "registration", label: "Registration" },
    {
      time: "9:00-9:15",
      kind: "remarks",
      label: "Opening Remarks",
      speaker: "Dean Jiye Mao",
    },
    {
      time: "9:15-10:15",
      kind: "talk",
      label: "Featured Talk",
      speaker: "Bernard Yeung",
      institution: "Southern University of Science and Technology",
      title:
        "Digital Transmission of Financial Knowledge: Evidence from Stock Market Investment",
    },
    {
      time: "10:15-10:40",
      kind: "break",
      label: "Group Photo & Coffee Break",
    },
    {
      time: "10:40-11:30",
      kind: "talk",
      label: "Presentation",
      speaker: "Jialu Shen",
      institution: "Fudan International School of Finance",
      title: "Reverse Mortgages, Housing, and Consumption: An Equilibrium Approach",
      discussant: {
        name: "Weilong Zhang",
        institution: "University of Cambridge",
      },
    },
    { time: "11:30-13:30", kind: "meal", label: "Lunch" },
    {
      time: "13:30-14:20",
      kind: "talk",
      label: "Presentation",
      speaker: "Ming Gao",
      institution: "Peking University",
      title: "From Factories to Finance: The Legacy of State-Led Industrialization",
      discussant: {
        name: "Pengpeng Yue",
        institution: "Beijing Technology and Business University",
      },
    },
    {
      time: "14:20-15:10",
      kind: "talk",
      label: "Presentation",
      speaker: "Siyu Chen",
      institution: "Jinan University",
      title: "Smart money: Innate Ability, Education, and Heterogeneous Stock Returns",
      discussant: {
        name: "Xiaomin Guo",
        institution: "Southern University of Science and Technology",
      },
    },
    { time: "15:10-15:30", kind: "break", label: "Coffee Break" },
    {
      time: "15:30-16:20",
      kind: "talk",
      label: "Presentation",
      speaker: "Guangli Lu",
      institution: "Chinese University of Hong Kong, Shenzhen",
      title: "From Firms to Homes: Coworker Networks, Firm Exposure, and Housing Purchases",
      discussant: {
        name: "Yapei Zhang",
        institution: "ShanghaiTech University",
      },
    },
    {
      time: "16:20-17:10",
      kind: "talk",
      label: "Presentation",
      speaker: "Jiangyi Li",
      institution: "Sichuan University",
      title: "The Spillover Effect of Negative Narratives in Household Financial Decisions",
      discussant: {
        name: "Wei Si",
        institution: "ShanghaiTech University",
      },
    },
    {
      time: "17:10-17:40",
      kind: "networking",
      label: "Networking Session",
    },
    { time: "17:40-19:40", kind: "meal", label: "Dinner" },
  ],
  sources: [
    {
      label: "Original event announcement",
      href: "https://mp.weixin.qq.com/s/SBFmctsEZy6P-xIW0PGQdg",
    },
  ],
};

const workshop2024: Workshop = {
  year: "2024",
  name: "2024 SEM Finance Workshop",
  date: "Monday, June 24, 2024",
  location: "Room 501, School of Entrepreneurship and Management, ShanghaiTech University",
  schedule: [
    { time: "9:00-9:15", kind: "remarks", label: "Opening Remarks" },
    {
      time: "9:15-10:00",
      kind: "talk",
      label: "Presentation",
      speaker: "Yang Zhou",
      institution: "Wuhan University",
      title: "Sea level rise, collateral constraints, and entrepreneurship",
    },
    { time: "10:00-10:15", kind: "break", label: "Coffee Break" },
    {
      time: "10:15-11:00",
      kind: "talk",
      label: "Presentation",
      speaker: "Fangzhou Liu",
      institution: "Shanghai University of Finance and Economics",
      title: "The Impact of Bank Deregulation on Competition and Product Innovation",
    },
    { time: "11:00-11:15", kind: "break", label: "Coffee Break" },
    {
      time: "11:15-12:00",
      kind: "talk",
      label: "Presentation",
      speaker: "Linyi Zhang",
      institution: "Chinese University of Hong Kong (Shenzhen)",
      title:
        "Exploitative and Explorative Learning from Others' Failures: Evidence from Peers' Product Recalls",
    },
    { time: "12:00-14:00", kind: "meal", label: "Lunch" },
    {
      time: "14:00-14:45",
      kind: "talk",
      label: "Presentation",
      speaker: "Yiqing Lv",
      institution: "New York University Shanghai",
      title: "Consumption out of Investment Proceeds under Limited Attention",
    },
    { time: "14:45-15:00", kind: "break", label: "Coffee Break" },
    {
      time: "15:00-15:45",
      kind: "talk",
      label: "Presentation",
      speaker: "Xiang Shao",
      institution: "Fudan University",
      title: "Competitive pressure and corporate steering strategy",
    },
    { time: "15:45-16:00", kind: "break", label: "Coffee Break" },
    {
      time: "16:00-16:45",
      kind: "talk",
      label: "Presentation",
      speaker: "Jiatao Liu",
      institution: "Xi'an Jiaotong-Liverpool University",
      title: "Pricing and Hedging Cybercrime News",
    },
    { time: "16:45-17:00", kind: "remarks", label: "Closing Remarks" },
  ],
  sources: [
    {
      label: "Original event announcement",
      href: "https://mp.weixin.qq.com/s/ylcncvf4Gsq9m_K0QNFi8A",
    },
  ],
};

const workshop2023: Workshop = {
  year: "2023",
  name: "2023 SEM Finance Workshop",
  date: "Wednesday, December 27, 2023",
  location: "Room 501, School of Entrepreneurship and Management, ShanghaiTech University",
  schedule: [
    { time: "9:00-9:15", kind: "remarks", label: "Opening Remarks" },
    {
      time: "9:15-10:30",
      kind: "talk",
      label: "Presentation",
      speaker: "Zhuo Zhong",
      institution: "University of Melbourne",
      title: "The Externality of the Complex Regulatory Process: ETFs' IPO Participation in China",
      abstract:
        "We show how economic activity under the complex regulatory process can lead to unexpected outcomes-an externality generating from the regulatory process. We examine a unique phenomenon among exchange traded funds (ETFs) in the Chinese stock market. We find ETFs pervasively participate in initial public offerings (IPOs) to profit from the underpricing. This is partly shaped by the complex regulatory landscape contributing to significant underpricing in IPOs and ETFs' advantageous positions in participating IPOs. The profit from an ETF's IPO participation leads to an increase in the ETF's excess return, tracking error, fund flow, and most importantly, a temporary increase in non-fundamental volatility among the ETF's constituents. The ETF-IPO participation demonstrates how financial market participants taking advantage of the complex regulatory landscape leads to unintended outcomes.",
    },
    { time: "10:30-10:45", kind: "break", label: "Coffee Break" },
    {
      time: "10:45-12:00",
      kind: "talk",
      label: "Presentation",
      speaker: "Jun Chen",
      institution: "Renmin University of China",
      title: "The Effects of the QSBS Exemption on Entrepreneurship and Innovation",
      abstract:
        "The paper studies the impact of capital gain taxation on entrepreneurship and innovation. We exploit a 2010 tax change that implemented a full exemption from federal capital gain tax on the sale of qualified small business stock (QSBS). The tax change led to a 12% increase in firm births in industries eligible for the exemption relative to ineligible industries. The effect is stronger in industries with a higher level of startup exits, technology intensity, and STEM employment. We also find that capital gain tax reduction increases prospective entrepreneurs' willingness to become founders and their ability to attract talent and raise capital.",
    },
    { time: "12:00-14:00", kind: "meal", label: "Lunch" },
    {
      time: "14:00-15:15",
      kind: "talk",
      label: "Presentation",
      speaker: "Hui Fu",
      institution: "Jiangnan University",
      title: "股票市场有效性与风险投资市场中的完美匹配",
      abstract:
        "本文研究了股票市场有效性是否显著改善了风险投资市场的完美匹配关系。当股票市场有效性较高时，有助于提高风险投资机构与被投资的创业企业之间匹配契合度，造成风险投资市场中更完美的匹配关系。本文通过阐述分析排除了内生性和反向因果关系的疑虑。异质性分析结果显示：在本土或者民营背景风险投资机构、风险投资机构与创业企业处于同一个地区、创业企业处于早期发展阶段以及非IPO暂停时期和低经济政策不确定时期等情形下，股票市场有效性对风险投资市场完美匹配关系的改善会更为显著。影响机制分析结果显示：股票市场有效性有助于提高风险投资市场信息交换充分程度和风险承担水平，进而改善风险投资市场中的完美匹配关系。最后，经济后果分析显示：股票市场有效性有助于提高风险投资机构最终的退出表现。本文为金融市场对实体经济的实际影响效果带来了新的启示，表明证券市场有效性的正外部性是非常广泛的，也为我们理解风险投资市场的投融资合作关系提供了新的角度。",
    },
    { time: "15:15-15:30", kind: "break", label: "Coffee Break" },
    {
      time: "15:30-16:45",
      kind: "talk",
      label: "Presentation",
      speaker: "Yifei Zhang",
      institution: "Peking University HSBC Business School",
      title: "Climate Innovation and Carbon Emissions: Evidence from Supply Chain Networks",
      abstract:
        "We study whether climate-related innovation leads to carbon emission reductions by analyzing supply chain networks. We find that climate innovation reduces carbon emissions at customer firms, but only for the supplier firm's product innovation patents, not its process innovations. The effect is economically significant, dominated by the most emission-intensive customer firms, gradually increases over a five-year horizon, and is significant for customer's Scope 1 and Scope 2 emissions. We analyze transmission mechanisms by exploring customer firms' choices of potential suppliers in reaction to supplier climate patent announcements. We show that customer firms generally have a strong preference for suppliers with climate innovations, and that climate innovation helps suppliers attract new customers, particularly those with high environmental ratings or a large carbon footprint. To sharpen the causality, we utilize the quasi-random assignment of examiners to climate patent applications and leverage the exogenous technological obsolescence of climate patents.",
    },
    {
      time: "16:45-17:30",
      kind: "networking",
      label: "Mingle & Discussion",
    },
    { time: "17:30-20:30", kind: "meal", label: "Dinner" },
  ],
  sources: [
    {
      label: "Event announcement I",
      href: "https://mp.weixin.qq.com/s/QbaZ4r-EKT2iup66tRf3vg",
    },
    {
      label: "Event announcement II",
      href: "https://mp.weixin.qq.com/s/tav7NgDWZNvkuWvXyLFlMw",
    },
    {
      label: "Event announcement III",
      href: "https://mp.weixin.qq.com/s/YQOB2ALXOO-svhJlO3RPhg",
    },
    {
      label: "Event announcement IV",
      href: "https://mp.weixin.qq.com/s/YzLcMlMuec7EdKillvW2cg",
    },
  ],
};

export const workshops = {
  "2025": workshop2025,
  "2024": workshop2024,
  "2023": workshop2023,
} as const;

export const workshopYears = ["2025", "2024", "2023"] as const;
