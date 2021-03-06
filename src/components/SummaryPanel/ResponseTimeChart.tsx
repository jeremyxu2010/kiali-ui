import * as React from 'react';
import { AreaChart, Icon } from 'patternfly-react';
import { PfColors } from '../../components/Pf/PfColors';

type ResponseTimeChartTypeProp = {
  label: string;
  rtAvg: [string, number][];
  rtMed: [string, number][];
  rt95: [string, number][];
  rt99: [string, number][];
  hide?: boolean;
};

export default class ResponseTimeChart extends React.Component<ResponseTimeChartTypeProp, {}> {
  constructor(props: ResponseTimeChartTypeProp) {
    super(props);
  }

  thereIsTrafficData = () => {
    console.log(this.props.rtAvg);
    return this.props.rtAvg && this.props.rtAvg.length > 1 && this.props.rtAvg[0].length > 1;
  };

  render() {
    const axis: any = {
      x: {
        show: false,
        type: 'timeseries',
        tick: {
          fit: true,
          count: 15,
          multiline: false,
          format: '%H:%M:%S'
        }
      },
      y: { show: false }
    };

    const chartData = {
      x: 'x',
      columns: (this.props.rtAvg as [string, number][])
        .concat(this.props.rtMed as [string, number][])
        .concat(this.props.rt95 as [string, number][])
        .concat(this.props.rt99 as [string, number][]),
      type: 'area-spline',
      hide: ['Average', 'Median', '99th']
    };

    return (
      <>
        {!this.props.hide && (
          <div>
            <div>
              <strong>{this.props.label}:</strong>
            </div>
            {this.thereIsTrafficData() ? (
              <AreaChart
                size={{ height: 80 }}
                color={{ pattern: [PfColors.Black, PfColors.Green400, PfColors.Blue, PfColors.Orange400] }}
                legend={{ show: true }}
                grid={{ y: { show: false } }}
                axis={axis}
                data={chartData}
              />
            ) : (
              <div>
                <Icon type="pf" name="info" /> Not enough traffic to generate chart.
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
