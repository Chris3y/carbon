import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import Profile from './profile.component';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Browser from '../../utils/helpers/browser';
import { ProfileNameStyle, ProfileAvatarStyle } from './profile.style';
import 'jest-styled-components';
import ProfileClassicStyle from './profile-classic.style';
import classicTheme from '../../style/themes/classic';


describe('PortraitContainer', () => {
  let instance;
  const fillRectFn = jest.fn();
  const fillTextFn = jest.fn();

  beforeAll(() => {
    spyOn(Browser, 'getDocument').and.returnValue({
      createElement: () => {
        return {
          getContext: () => {
            return {
              font: null,
              textAlign: null,
              fillStyle: null,
              fillRect: fillRectFn,
              fillText: fillTextFn
            };
          },
          width: 10,
          height: 10,
          toDataURL: () => {
            return 'data:image/png';
          }
        };
      }
    });
  });

  describe('render', () => {
    beforeEach(() => {
      instance = shallow(
        <Profile
          name='Foo'
          email='foo@bar.com'
          initials='FB'
        />
      );
    });

    describe('classes', () => {
      it('returns the correct classes', () => {
        instance.setProps({ className: 'foo' });
        expect(instance.hasClass('foo')).toBeTruthy();
      });

      it('renders the large class if applied', () => {
        instance = TestRenderer.create(<Profile
          name='Foo'
          email='foo@bar.com'
          initials='FB'
          large
        />);

        expect(instance).toMatchSnapshot();
      });
    });

    describe('initials', () => {
      it('calculates the initials when not provided', () => {
        instance = TestUtils.renderIntoDocument(
          <Profile
            name='Foo Bar Baz'
            email='foo@bar.com'
          />
        );
        expect(instance.initials).toEqual('FBB');
      });
    });

    describe('avatar', () => {
      it('returns the portrait component', () => {
        expect(ProfileAvatarStyle).toBeTruthy();
      });
    });

    describe('text', () => {
      it('renders the name', () => {
        instance.setProps({ name: 'test name' });
        expect(instance.find(ProfileNameStyle).text()).toEqual('test name');
      });

      it('renders the email', () => {
        instance.setProps({ email: 'john@doe.com' });
        expect(instance.find('span[data-element="email"]').text()).toEqual('john@doe.com');
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Profile
        data-element='bar' data-role='baz'
        email='bun' name='dy'
      />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'profile', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(<Profile email='bun' name='dy' />);

      elementsTagTest(wrapper, [
        'email',
        'name'
      ]);
    });
  });
});

describe('ProfileClassicStyle', () => {
  it('should render correct version if clssic is provided', () => {
    const wrapper = TestRenderer.create(<ProfileClassicStyle
      theme={ classicTheme }
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
