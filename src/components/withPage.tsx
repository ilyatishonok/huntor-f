import React, { Component, ReactNode } from 'react';

interface IPageState {
    page: number;
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export interface IInjectedPageProps {
    page: number;
    nextPage: () => void;
    previousPage: () => void;
}

export default <T extends IInjectedPageProps>(OriginalComponent: React.ComponentType<T>) =>
    class WrappedComponent extends Component<Subtract<T, IInjectedPageProps>, IPageState> {
        public state = {
            page: 1,
        }

        private nextPage = () => {
            this.setState(state => ({page: state.page + 1}));
        }

        private previousPage = () => {
            this.setState(state => ({page: state.page - 1}));
        }

        public render(): ReactNode {
            return <OriginalComponent
                {...this.props as T}
                page={this.state.page}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
            />
        }
    }