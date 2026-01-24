import React, { useState } from "react";
import { observer } from "mobx-react";

import { HoneycombStructure } from "../cad/HoneycombStructure";
import { OUTER_RADIUS } from "../cad/constants";

import useAppState from "../useAppState";
import { useTranslation } from "../i18n/LanguageContext";

import { InputBlock, Form, SaveButtonRow } from "./common";
import { Preview } from "../components/Preview";

const STRUCTURE = new HoneycombStructure(OUTER_RADIUS);

export default observer(function EditGridForm() {
  const state = useAppState();
  const { t } = useTranslation();

  const [width, setWidth] = useState(
    Math.ceil(STRUCTURE.totalWidth(state.config?.columns || 7))
  );
  const [height, setHeight] = useState(
    Math.ceil(STRUCTURE.totalHeight(state.config?.rows || 5))
  );

  const columns = STRUCTURE.columnsForWidth(width);
  const rows = STRUCTURE.rowsForHeight(height);

  const saveChanges = (e) => {
    e.preventDefault();
    const changes = {
      columns,
      rows,
    };
    state.updateRowsAndCols(changes);
  };

  return (
    <>
      <Form onSubmit={saveChanges}>
        <SaveButtonRow />
        <InputBlock title={`${t('height')} (mm)`} htmlFor="height">
          <input
            id="height"
            type="number"
            step="1"
            min="50"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value, 10))}
          />
        </InputBlock>
        <InputBlock title={`${t('width')} (mm)`} htmlFor="width">
          <input
            id="width"
            type="number"
            step="1"
            min="50"
            value={width}
            onChange={(e) => setWidth(parseFloat(e.target.value, 10))}
          />
        </InputBlock>
      </Form>
      <div>
        {rows} {t('rows')}, {columns} {t('columns')}
      </div>
      <div>
        <Preview
          rows={rows}
          columns={columns}
          width={width}
          height={height}
          profileConfig={state.config.profileConfig}
        />
      </div>
    </>
  );
});
