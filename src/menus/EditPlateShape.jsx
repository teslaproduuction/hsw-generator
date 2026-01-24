import React, { useState, useImperativeHandle } from "react";
import { observer } from "mobx-react";

import useAppState from "../useAppState";
import { useTranslation } from "../i18n/LanguageContext";

import { InputTitle, BaseInline, Inline, InputBlock } from "./common";

export default observer(
  React.forwardRef(function EditGridForm(_, ref) {
    const state = useAppState();
    const { t } = useTranslation();

    const [left, setLeft] = useState(state.config.profileConfig.disableLeft);
    const [right, setRight] = useState(state.config.profileConfig.disableRight);
    const [top, setTop] = useState(state.config.profileConfig.disableTop);
    const [bottom, setBottom] = useState(
      state.config.profileConfig.disableBottom
    );
    const [roundedCorners, setRoundedCorners] = useState(
      state.config.profileConfig.roundedCorners
    );
    const [fillFlatFaces, setFillFlatFaces] = useState(
      state.config.profileConfig.fillFlatFaces
    );
    const [enableBase, setEnableBase] = useState(
      state.config.profileConfig.enableBase
    );
    const [baseThickness, setBaseThickness] = useState(
      state.config.profileConfig.baseThickness
    );

    useImperativeHandle(ref, () => {
      return {
        saveChanges: () => {
          const changes = {
            disableLeft: left,
            disableRight: right,
            disableTop: top,
            disableBottom: bottom,
            roundedCorners,
            fillFlatFaces,
            enableBase,
            baseThickness,
          };

          state.updateProfile(changes);
        },
      };
    });

    return (
      <>
        <InputTitle as="div" style={{ marginTop: "2em" }}>
          {t('flatBorders')}
        </InputTitle>
        <BaseInline>
          <input
            id="left"
            type="checkbox"
            checked={left}
            onChange={(e) => setLeft(e.target.checked)}
          />
          <label htmlFor="left">{t('left')}</label>
        </BaseInline>
        <BaseInline>
          <input
            id="top"
            type="checkbox"
            checked={top}
            onChange={(e) => setTop(e.target.checked)}
          />
          <label htmlFor="top">{t('top')}</label>
        </BaseInline>
        <BaseInline>
          <input
            id="right"
            type="checkbox"
            checked={right}
            onChange={(e) => setRight(e.target.checked)}
          />
          <label htmlFor="right">{t('right')}</label>
        </BaseInline>
        <BaseInline>
          <input
            id="bottom"
            type="checkbox"
            checked={bottom}
            onChange={(e) => setBottom(e.target.checked)}
          />
          <label htmlFor="bottom">{t('bottom')}</label>
        </BaseInline>

        <InputTitle as="div" style={{ marginTop: "2em" }}>
          {t('cornerStyle')}
        </InputTitle>
        <BaseInline>
          <input
            id="roundedCorners"
            type="checkbox"
            checked={roundedCorners}
            onChange={(e) => setRoundedCorners(e.target.checked)}
          />
          <label htmlFor="roundedCorners">{t('roundedCorners')}</label>
        </BaseInline>

        <InputTitle as="div" style={{ marginTop: "2em" }}>
          {t('faces')}
        </InputTitle>
        <BaseInline>
          <input
            id="fillFlatFaces"
            type="checkbox"
            checked={fillFlatFaces}
            onChange={(e) => setFillFlatFaces(e.target.checked)}
          />
          <label htmlFor="fillFlatFaces">{t('fillFlatFaces')}</label>
        </BaseInline>

        <InputTitle as="div" style={{ marginTop: "2em" }}>
          {t('basePlate')}
        </InputTitle>
        <BaseInline>
          <input
            id="enableBase"
            type="checkbox"
            checked={enableBase}
            onChange={(e) => setEnableBase(e.target.checked)}
          />
          <label htmlFor="enableBase">{t('enableBase')}</label>
        </BaseInline>
        {enableBase && (
          <InputBlock title={t('baseThickness')} htmlFor="baseThickness">
            <input
              id="baseThickness"
              type="number"
              step="0.1"
              min="0.1"
              max="10"
              value={baseThickness}
              onChange={(e) => setBaseThickness(parseFloat(e.target.value))}
            />
          </InputBlock>
        )}
      </>
    );
  })
);
