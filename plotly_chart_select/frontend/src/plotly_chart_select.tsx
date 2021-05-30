import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import Plot from "react-plotly.js";

/**
 * This is a React-based component template. The `render()` function is called
 * automatically when your component should be re-rendered.
 */
class PlotlyChartSelect extends StreamlitComponentBase {
  
  public render = (): ReactNode => {

    const fig = JSON.parse(this.props.args["fig"]);

    return (
      <Plot
        className="stPlotlyChart"
        style={{position: 'relative', height: fig.layout.height, width: fig.layout.width}} 
        data={fig.data}
        layout={fig.layout}
        // config={fig.config}
        config={{
          'displaylogo': false,
          'modeBarButtonsToRemove': ['toImage', 'zoom2d', 'lasso2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
          }}
        frames={fig.frames}
        onClick={this.onSelect}
        onSelected={this.onSelect}
      />
    )
  }

  private onSelect = (eventData: any): void => {
    var selectedPoints: Array<any> = [];
    eventData.points.forEach(function (arrayItem: any) {
      selectedPoints.push({
        index: arrayItem.pointIndex,
        x: arrayItem.x,
        y: arrayItem.y,
      })
    });

    Streamlit.setComponentValue(selectedPoints)
  }
}

// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(PlotlyChartSelect)
