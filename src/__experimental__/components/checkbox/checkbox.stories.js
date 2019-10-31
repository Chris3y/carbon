import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, text, number, select
} from '@storybook/addon-knobs';
import { Store, State } from '@sambego/storybook-state';
import Form from '../form';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { Checkbox, CheckboxGroup } from '.';
import { info, notes, infoValidations } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';
import Text from '../../../utils/helpers/text';

Checkbox.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /checkbox\.component(?!spec)/
);

function testValidator(value, props) {
  return new Promise((resolve, reject) => {
    if (['required', 'mandatory', 'one'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('This checkbox is required!'));
    } else if (props.name === 'checkbox-group' && value === '0') {
      reject(new Error('This checkbox is required!'));
    } else {
      resolve();
    }
  });
}

function testWarning(value, props) {
  return new Promise((resolve, reject) => {
    if (['warning', 'alert', 'two'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('Show warning!'));
    } else if (props.name === 'checkbox-group' && value === '1') {
      reject(new Error('Show warning!'));
    } else {
      resolve();
    }
  });
}

function testInfo(value, props) {
  return new Promise((resolve, reject) => {
    if (['info', 'example', 'three'].indexOf(value) !== -1 && !props.checked) {
      reject(new Error('Show this information'));
    } else if (props.name === 'checkbox-group' && value === '2') {
      reject(new Error('Show this information'));
    } else {
      resolve();
    }
  });
}

const checkboxes = {
  default: {}, required: {}, warning: {}, info: {}, optional: {}, one: {}, two: {}, three: {}
};
const checkboxKeys = Object.keys(checkboxes);

checkboxKeys.forEach((id) => {
  checkboxes[id] = {
    store: new Store({
      checked: false,
      forceUpdateTriggerToggle: false
    })
  };
});
const formCheckbox = checkboxKeys.filter(name => ['required', 'warning', 'info', 'optional'].indexOf(name) !== -1);
const groupCheckbox = checkboxKeys.filter(name => ['one', 'two', 'three'].indexOf(name) !== -1);

const groupStore = new Store({ value: [] });

function defaultKnobs(type) {
  const knobGroup = `Checkbox ${type}`;
  const nameWithGroup = (name) => {
    return (type === 'default') ? name : `${Text.titleCase(type)} ${name}`;
  };
  const label = `${text(nameWithGroup('label'), 'Example Checkbox', knobGroup)} (${type})`;

  return ({
    disabled: boolean(nameWithGroup('disabled'), false, knobGroup),
    fieldHelp: text(nameWithGroup('fieldHelp'), 'This text provides help for the input.', knobGroup),
    fieldHelpInline: boolean(nameWithGroup('fieldHelpInline'), false, knobGroup),
    reverse: boolean(nameWithGroup('reverse'), false, knobGroup),
    label,
    labelHelp: text(nameWithGroup('labelHelp'), 'This text provides more information for the label.', knobGroup),
    inputWidth: number(nameWithGroup('inputWidth'), 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, knobGroup),
    labelWidth: number(nameWithGroup('labelWidth'), 0, {
      range: true,
      min: 0,
      max: 100,
      step: 1
    }, knobGroup),
    labelAlign: select(
      nameWithGroup('labelAlign'),
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0],
      knobGroup
    ),
    size: select(nameWithGroup('size'), OptionsHelper.sizesBinary, 'small', knobGroup),
    value: text(nameWithGroup('value'), type, knobGroup)
  });
}

function makeStory(name, themeSelector, component) {
  const metadata = {
    themeSelector,
    info: {
      text: name.search('validations') !== -1 ? infoValidations : info,
      propTablesExclude: [State],
      excludedPropTypes: ['children']
    },
    notes: { markdown: notes },
    knobs: { escapeHTML: false }
  };

  return [name, component, metadata];
}

function handleChange(ev, id) {
  const { checked } = ev.target;

  checkboxes[id].store.set({
    checked,
    forceUpdateTriggerToggle: !checked
  });

  action('change')(`checked: ${checked}`);
}

const handleGroupChange = groupStore => (event) => {
  const { value } = event.target;
  const oldGroupStore = groupStore.get('value');
  const checkboxIndex = oldGroupStore.indexOf(value);
  let checked = false;

  if (checkboxIndex !== -1) {
    oldGroupStore.splice(checkboxIndex, 1);
  } else {
    oldGroupStore.push(value);
    checked = true;
  }
  
  groupStore.set({ value: oldGroupStore });
  
  action('onChange')(`checked: ${checked}`);
};

function handleSubmit(ev) {
  ev.preventDefault();
  action('submit')();
}

const checkboxComponent = () => {
  return (
    <State store={ checkboxes.default.store }>
      <Checkbox
        onChange={ ev => handleChange(ev, 'default') }
        { ...defaultKnobs('default') }
      />
    </State>
  );
};

const validationTypes = ['error', 'warning', 'info'];
const legend = text('legend', 'Are you coming to the event?');
const labelHelp = text('labelHelp', 'Group label helper');

function testValidation(type) {
  return (value) => {
    return new Promise((resolve, reject) => {
      if (type === 'valid' && value === 'one') {
        reject(new Error('An error has occurred!'));
      }

      if (type === 'warn' && value === 'two') {
        reject(new Error('Watch out!'));
      }

      if (type === 'info' && value === 'three') {
        reject(new Error('Let me tell you this...'));
      }

      resolve();
    });
  };
}

const checkboxGroupComponent = () => (
  <>
    <h3>In Form</h3>
    <Form onSubmit={ handleSubmit }>
      {formCheckbox.map(type => (
        <State store={ checkboxes[type].store } key={ `check-state-${type}` }>
          <Checkbox
            key={ `checkbox-input-${type}` }
            validations={ testValidator }
            warnings={ testWarning }
            info={ testInfo }
            onChange={ ev => handleChange(ev, type) }
            name={ `my-checkbox-${type}` }
            { ...defaultKnobs(type) }
          />
        </State>
      ))}
    </Form>

    <h3>In Group</h3>
    <State store={ groupStore }>
      <CheckboxGroup
        key='checkbox-group'
        name='checkbox-group'
        label={ text('label', 'What would you choose?', 'group') }
        labelHelp={ text('labelHelp', 'Some helpful information', 'group') }
        validations={ testValidation('valid') }
        warnings={ testValidation('warn') }
        info={ testValidation('info') }
        onChange={ handleGroupChange(groupStore) }
      >
        {groupCheckbox.map(id => (
          <Checkbox
            name={ `checkbox-input-${id}` }
            key={ `checkbox-input-${id}` }
            labelHelp={ text(`${Text.titleCase(id)} labelHelp`, '', `Checkbox ${id}`) }
            { ...defaultKnobs(id) }
          />
        ))}
      </CheckboxGroup>
    </State>
  </>
);

storiesOf('Experimental/Checkbox', module)
  .add(...makeStory('default', dlsThemeSelector, checkboxComponent))
  .add(...makeStory('classic', classicThemeSelector, checkboxComponent))
  .add(...makeStory('validations', dlsThemeSelector, checkboxGroupComponent))
  .add(...makeStory('validations classic', classicThemeSelector, checkboxGroupComponent));
