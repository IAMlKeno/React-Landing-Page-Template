import type { ServiceItem } from "../types";

interface Props {
  data?: ServiceItem[];
}

function createRow(children: ServiceItem[]) {
  const rowCount: number = 3;
  const rows = [];
  let idx = 0;
  while (idx < children.length - 1) {
    const start = idx;
    const end = idx + rowCount;
    const slice = children.slice(start, end);

    const rowContent = slice.map((d, i) => (
      <div key={`${d.name}-${i}`} className="col-md-4">
        <i className={d.icon}></i>
        <div className="service-desc">
          <h3>{d.name}</h3>
          <p>{d.text}</p>
        </div>
      </div>
    ));

    const row = (
      <div key={`row-[${start}-${end}]`} className="row">
        {rowContent}
      </div>
    )
    rows.push(row);

    idx += rowCount;
  }
  return rows
}

export const Services = ({ data }: Props) => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>
            Six disciplines, one partner. We cover every layer of your technology stack so you never have to juggle multiple vendors.
          </p>
        </div>
        <div className="row">
          {data
            ? createRow(data)
            : "loading"}
        </div>
      </div>
    </div>
  );
};
