import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseConstants } from 'src/core/constants';
import { Localization } from 'src/core/database/localization/localization.schema';
import { filterUndefinedParams } from 'src/utils/filter-undefined';

@Injectable()
export class LocalizationService {
  constructor(
    @Inject(DatabaseConstants.LOCALIZATION_MODEL)
    private localizationModel: Model<Localization>,
  ) {}

  async createLocalization(localization: Localization) {
    const savedLocalization = new this.localizationModel(localization);
    return savedLocalization.save();
  }

  async getAllLocalization(params: Partial<Localization>) {
    const filteredParams = filterUndefinedParams<Localization>(params, [
      'name',
    ]);

    return this.localizationModel
      .find(filteredParams)
      .exec()
      .then((localizations) =>
        localizations.filter((localization) =>
          params.name && params.name !== ''
            ? localization.name
                .toLowerCase()
                .trim()
                .includes(params?.name.toLowerCase().trim())
            : true,
        ),
      );
  }

  async updateLocalization(localization: Partial<Localization>, id: string) {
    return this.localizationModel.findOneAndUpdate({ _id: id }, localization);
  }
}
